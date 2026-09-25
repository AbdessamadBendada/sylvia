# Divi 5 build plan — Homepage sections 1 & 2 (Hero + Statement)

Target: pixel-identical reproduction of `index.html` lines 2080–2137 inside Divi 5.
Executor: Claude in Chrome, driving the Divi Visual Builder in a browser tab.

**Path A (this plan): no child theme.** Everything lives on the page in three
Code Modules. No SFTP, no `functions.php`, no admin file editing — three
clipboard pastes and a handful of settings. This is the fast way to see the two
sections standing up in Divi.

Path B (child theme) is at the bottom. You will need it before section 3.

## Strategy in one line

**Do not rebuild these sections as native Divi modules.** Create empty Divi
containers, paste exact markup into Code Modules, and let the page's own CSS
supply every pixel.

Rationale: these two sections use `clamp()` throughout, a `position: sticky`
180vh scroll stage, and a `requestAnimationFrame` per-word cascade. Divi's UI
cannot express any of that — its numeric inputs reject `clamp()` outright, so
fluid scaling would silently become fixed px. Pasting is both more accurate and
far more reliable to automate.

---

## The three paste blocks

Paste each file's **entire contents** into one Code Module. Nothing else.

| # | File | Size | Goes where |
|---|---|---|---|
| CM-0 | `05-codemodule-0-styles.html` | 16.1 KB | First section on the page |
| CM-1 | `06-codemodule-1-hero.html` | 1.3 KB | Second section (Hero) |
| CM-2 | `07-codemodule-2-statement.html` | 9.3 KB | Third section (Statement) |

**Order is load-bearing.** CM-0 defines the CSS. CM-2 ends with the `<script>`,
which runs when parsed and needs the Hero and Statement DOM to already exist.
Any other order breaks the page.

### What's inside each

**CM-0** — one `<style>` containing, in this order:
1. `@import` for DM Sans + Stack Sans Headline. **Must stay the first line** —
   CSS ignores `@import` if any rule precedes it, and both fonts vanish.
2. The Divi container reset (below).
3. A 633-line subset of the shell CSS.

**CM-1** — the Hero markup, verbatim from `index.html` 2080–2112.

**CM-2** — the Statement markup (2114–2137) plus the null-guarded motion engine.

### About the CSS subset

`02b-shell-subset.css` is the full shell (1,875 lines / 44.8 KB) reduced to the
91 blocks these two sections actually need — 633 lines / 15.3 KB. Verified: all
16 classes in the markup are covered, all 9 runtime classes the JS applies are
covered, and every CSS variable is either declared or set at runtime by the JS.

It is a **subset**. Rules for sections 3–10 are gone. The moment you build a
third section, stop using it and move to Path B.

---

## The Divi container reset (already inside CM-0)

Nothing works without this. Divi caps every row at 1080px, which is exactly
where your 1540px `.shell` dies.

```css
body .et_pb_section.digit-raw { padding: 0 !important; }
body .et_pb_row.digit-raw-row {
  width: 100% !important; max-width: 100% !important;
  padding: 0 !important; margin: 0 !important;
}
body .et_pb_row.digit-raw-row .et_pb_column { width: 100% !important; margin: 0 !important; }
body .digit-raw p { padding-bottom: 0; }
```

Scoped to `.digit-raw` deliberately — it must not leak into sections you later
build as real Divi modules.

---

## Browser steps (Claude in Chrome)

Create the page, then repeat this block three times — CM-0, CM-1, CM-2.

**Per section:**

1. Add a **Section** (regular, one column).
2. Section > **Advanced > Attributes > CSS Class**: `digit-raw`
3. Section > **Design > Spacing**: top and bottom padding `0`.
4. Row > **Advanced > Attributes > CSS Class**: `digit-raw-row`
5. Row > **Design > Sizing**: Width `100%`, Max Width `100%`, Gutter Width `1`.
6. Row > **Design > Spacing**: all padding and margin `0`.
7. Insert a **Code Module**; paste the whole file.
8. Save.

Roughly 9 operations per section, most a single field. A native rebuild of the
same two sections would be several hundred.

> **Paste, never type.** Divi's code field is CodeMirror with auto-close-brackets
> on. Simulated keystrokes turn every `{` into `{}` and every `"` into `""`. The
> result looks correct in the panel and is broken on save. Use a real clipboard
> paste.

---

## After the pastes

**Fix the image path.** In CM-1, replace `src="assets/sylvia-website.webp"` with
the Media Library URL. Upload the file first — the relative path 404s in
WordPress.

Note from `AGENTS.md`: this image is a *scene*, and the standing subject's head
is cropped out in the source file. That is expected. Do not substitute
`sylvia.webp` — the CSS framing is built for this specific image.

---

## Verify

The Statement is what breaks quietly, because it depends on scroll geometry Divi
may have altered.

1. **`.shell` width** — DevTools on `.hero.shell`: 1540px at a 1920px viewport.
   Reads 1080px? The reset didn't apply; check the `digit-raw` classes.
2. **Fonts** — headings in Stack Sans Headline, body in DM Sans. Generic
   sans-serif means the `@import` isn't first in the `<style>` block.
3. **Statement geometry** — `.statement` computed `min-height: 180vh`, and
   `.statement > .shell` is `position: sticky`.
4. **Word cascade** — scroll slowly: words go 14% → 100% opacity in sequence,
   then metrics fade in and count up at 82% scroll progress.
5. **Console clean** — any null-reference error means a guard was missed.
6. **Side by side** — local `index.html` vs the Divi page at 1440px and 390px.
7. **390px** — use an iframe at that width, not a 390px window. Headless and
   some emulated modes clamp the layout viewport to 500px, which clips content
   and looks like a bug that isn't one.

### Runtime guards in the motion script

`03-motion.js` differs from `index.html` 2381–2564 in three places, all marked
`GUARD`. The original assumes the whole page exists; on a two-section page these
throw and silently kill every listener below them:

| Line | Problem | Fix |
|---|---|---|
| 1 | `getElementById("year")` — `#year` is in the footer | null check |
| ~20 | `querySelector("[data-scroll-reveal]").closest()` | optional chaining |
| ~160 | `querySelector(".about-pull").classList` — About doesn't exist | null check |

Passes `node --check`.

---

## Known divergences to accept

- Divi wraps the Code Module in its own divs. Harmless — the CSS targets your
  classes, not document structure.
- `#approach` is preserved on the Statement section, so the header's Approach
  link works once the header exists.
- The homepage preloader is **not** in this plan. It sits outside the shared
  shell by design; add it later, conditionally on the front page.

## What this deliberately does not do

These sections stay as pasted markup, so Sylvia cannot edit them in the Visual
Builder. That is the right trade for the Hero and Statement — visually
load-bearing, rarely changed. Sections 4–8 (Services, Process, About, Logos,
Testimonials) should be built as **real Divi modules**, because those are what
she will actually edit.

---

## Path B — moving to a child theme (before section 3)

Path A does not scale, for two specific reasons:

- The shell CSS is **shared across all five pages**. In Code Modules you would
  paste 45 KB into every page and then maintain five copies — the exact parity
  problem `AGENTS.md` says the static site already solved once.
- CSS in `post_content` is not cacheable or minifiable the way a stylesheet is,
  and it ships inside the page on every load.

When you switch:

1. Activate a child theme.
2. Move the **full** `02-shell.css` (1,875 lines) into its `style.css` — not the
   subset.
3. Move the reset block in with it.
4. Enqueue fonts properly with `wp_enqueue_style` and a `preconnect`, dropping
   the `@import` (which is render-blocking and slower).
5. Enqueue `03-motion.js` in the footer, front page only.
6. Delete CM-0 from the page. CM-1 and CM-2 stay exactly as they are.

Nothing about the Hero or Statement markup changes. Only where the CSS and JS
live.
