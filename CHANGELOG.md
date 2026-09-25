# Project Change Log

## 2026-09-25

### Repository checkpoint and source hygiene

- Prepared the completed static-page refinements, homepage preloader, Divi migration package, Gutenberg prototypes, and canonical native WordPress theme for version control.
- Updated `.gitignore` to keep machine-local Codex/browser state and root-level visual verification captures out of the repository while preserving the project-specific Divi toolkit configuration.
- Verification: confirmed shared-shell parity across all five live pages; validated JavaScript syntax and JSON files; tested all ZIP archives; and ran `git diff --check` successfully.

## 2026-09-16

### Client review updates to three static pages

- `free-template.html`: changed the opt-in hero to navy with an orange headline and button, white form controls, and navy text on the light workbook cover.
- `about-2.html`: removed “The belief” eyebrow and the statement/fractional section dividers; replaced the fractional aside text with `assets/sylvia.webp` beside the quote on desktop and above it on mobile.
- `work-with-us.html`: replaced the hero headline with “AI for speed. Expert for trust. Set up to scale.”, removed its eyebrow and duplicate tagline, and added an offers CTA. The three offer descriptions remain unchanged.
- `AGENTS.md`: recorded the approved page treatments and portrait placement for future work.
- Verification: inspected local Chrome renders at 1440px and 390px, including the About statement/portrait, free-template form/cover, and services hero; ran `git diff --check` and confirmed the derived pages retain the shared CSS shell from `index.html`.
- Follow-up on `about-2.html`: removed the orange rule beside the statement's supporting sentence and reduced the combined padding between the statement and portrait/quote. Verified the revised transition at desktop and mobile widths.

## 2026-09-07

### Canonical native Gutenberg homepage foundation

- Added the canonical standalone block theme at `wordpress-theme/digit-finance/`. It has no Divi, parent-theme, plugin, or custom-block dependency; normal content uses native WordPress Groups, Navigation, Images, Headings, Paragraphs, Quotes, and Buttons.
- Recreated the approved header, Hero, and Partnership/metrics sections from `index.html`. The page copy, links, image, quote, labels, and metric values remain editable as normal Gutenberg blocks.
- Kept behavior isolated from content: responsive layout and section styling live in `assets/css/`, while the homepage title/portrait/quote reveal, scroll-driven statement, metric counters, and homepage-only preloader live in `assets/js/`.
- Added the reusable `Homepage — Hero and Partnership` block pattern and theme editor styles, plus a native responsive navigation with an editable mobile call-to-action.
- Packaged version 0.1.2 as `wordpress-theme/digit-finance-gutenberg-0.1.2.zip` and installed it on staging. Created and published the sole `Home` page (ID 68), localized its portrait to the WordPress Media Library, and assigned it as the static homepage.
- Verification: `theme.json` parses; both JavaScript files pass `node --check`; CSS braces, WordPress block-comment nesting, and block attribute JSON validate; the ZIP passes `unzip -t`; bundled images match the approved source assets by SHA-256; the theme installs and updates successfully under WordPress/PHP; the page opens in Gutenberg without invalid-block warnings; and live desktop/mobile checks confirm the responsive layouts, scroll reveal, counters, mobile navigation, no horizontal overflow, and no browser-console errors.
- The approved `index.html` and all earlier local prototypes were preserved unchanged during this implementation.

## 2026-09-06

### Staging WordPress reset

- Reset the staging site to a clean WordPress installation while preserving its domain configuration and sole administrator account.
- Removed Divi, the custom `Digit Finance` theme, the older bundled themes, and all plugins. The official Twenty Twenty-Five theme is the only installed and active theme.
- Permanently deleted all posts, pages (including `AI Test Homepage`, page ID 23), comments, and 17 uploaded media files. WordPress now reports zero items in each corresponding content area.
- Preserved every local approved HTML, asset, and migration source file; the destructive reset applied only to the staging WordPress installation.
- Verification: confirmed one administrator remains, no plugins are installed, only Twenty Twenty-Five is installed and active, content and media libraries are empty, and the public empty-site view loads without browser-console errors.

### Gutenberg block-theme migration foundation

- Added a new standalone, parentless WordPress block theme at `gutenberg-theme/digit-finance/`. It is intentionally separate from the approved static source and the prior Divi migration package.
- Added a `theme.json` design system for the Digit palette, typography, responsive spacing and block-editor controls. Normal homepage content is built from editable core blocks (Groups, Columns, Headings, Paragraphs, Images, Buttons and Quotes), assembled in `patterns/homepage.php`.
- Added template-part foundations for the editable site header and footer, plus a dedicated `page-ai-test-homepage.html` template so the staging page can be targeted without changing other pages during the first installation.
- Copied only the homepage assets used by the block theme into its own `assets/` directory. The approved source assets and `index.html` were not changed.
- Added the small `gutenberg-theme/digit-finance-behavior/` companion plugin. It contains no editable content: it supplies only a homepage-only preloader and progressive statement reveal, and leaves the page fully readable if JavaScript is unavailable or reduced motion is requested.
- Verification: `git diff --check`, JavaScript syntax validation, CSS brace checks and WordPress block-comment balance checks pass. PHP CLI is unavailable in this workspace, so PHP lint and live WordPress rendering remain pending installation-stage validation.
- Staging installation: installed and activated `Digit Finance Behaviour` 0.1.0, installed and activated the `Digit Finance` theme, assigned the dedicated template to page ID 23, published it, and set it as the site’s static homepage. Live browser verification confirms the editable core-block homepage, local theme assets, preloader dismissal and no browser-console errors. Theme package is now 0.1.2 after completing the editable header and footer patterns.

## 2026-09-05

### Homepage Divi migration package

- Completed the local homepage migration package at `divi-migration/digit-finance-divi/` without modifying the approved static website or connecting to WordPress.
- Kept only the editable `Digit Hero` and `Statement & Metrics` custom modules. Removed the retired custom Service List module from registration, its Divi 5 library bridge, and the package source.
- Replaced the package's motion-only stylesheet with the approved homepage shell styling, added a Divi Group-class bridge, and documented native Divi 5 assemblies for Services, Process, Founder, Logos, Free Template, Testimonials and Closing CTA in `HOMEPAGE_ASSEMBLY.md`.
- Added a self-contained homepage-only preloader component with the approved animated WebP, session gate, reduced-motion bypass, image-error guard and hard timeout. It is injected only on `is_front_page()` and does not touch `index.html`.
- Verification: JavaScript syntax checks and `git diff --check` pass. PHP linting and live Divi Visual Builder verification remain pending because this repository has no PHP runtime or WordPress staging installation.

### Divi homepage plugin package

- Added the WordPress plugin package at `divi-migration/digit-finance-divi/` without installing or activating it in WordPress.
- Added three editable Divi modules: `Digit Hero`, `Statement & Metrics`, and `Service List`. Their content fields cover copy, links, imagery, metric values, counter targets, prefixes and suffixes.
- Added scoped frontend CSS and guarded motion JavaScript for hero image reveal, statement word/counter animation, service interactions, and reduced-motion handling.
- Added a guarded Divi 5 module-library bridge plus a README documenting the later staging installation and native-module assembly work.
- Verification: JavaScript `node --check` passes for both plugin scripts; PHP linting was unavailable because this environment has no PHP binary. WordPress/Divi Visual Builder registration remains pending staging verification.

### Divi plugin audit fixes

- Hardened Divi 5 Visual Builder loading to use `PackageBuildManager` on the official Visual Builder asset hook, with the correct Divi vendor hooks dependency and guarded Divi 5 detection.
- Added defaults and escaping guards to all PHP module render fields, editable section anchor IDs, valid WordPress service routes, and duplicate-registration protection.
- Added complete Visual Builder content settings for text, image, and service-link fields; removed the invalid placeholder icon declaration.
- Made the motion script idempotent and safe when `IntersectionObserver` is unavailable, and added mobile layout rules for the custom modules.
- Escaped words before the motion script writes generated spans with `innerHTML`, preventing editor-entered angle brackets from becoming executable markup.
- Verification: both JavaScript files pass `node --check`; `git diff --check` passes. PHP linting and live Divi 5 rendering remain unavailable without PHP and a staging WordPress installation.

## 2026-09-04

### Homepage animated-logo preloader

- Converted the client's animated logo from MP4 to animated WebP and added it as a homepage-only preloader. `assets/digit-preloader.webp` is 832×464 — the source's native resolution — 74 frames at 42ms (3.11s), loop count 1 so it holds its final navy lockup. **191 KB, down from the 1,132 KB source — an 83% reduction.**
- Trimmed on evidence rather than by eye. Frame-difference analysis showed motion stops at 4.25s and frames 4.3s–6.0s are identical to within noise — 1.7 seconds of dead static hold — plus a blank 0.15s at the head. Cut both, then sped the remainder 1.35× to land at 3.07s, per client direction on duration. Dropped to 24fps and encoded at lossy q90, kept at native width. An earlier 560px q78 encode at 98 KB was replaced: it was sized for a small centred panel, and once the preloader went full-bleed it was being stretched 2.6× on a 1440px viewport on top of the downscale from 832px, which visibly pixelated the lettering. Lossless was 773 KB and rejected.
- Runs full-bleed, edge to edge, per client direction. Getting there took several attempts, recorded because the dead ends are not obvious:
  - A single `object-fit: cover` layer is right on desktop but unusable in portrait. At 390×844 it crops the lockup to roughly a quarter of its width and the logo becomes unreadable.
  - Matching a flat overlay colour to the clip does not work at any size. The clip runs from a cool `#f2f2f4` to `#06013b` and its background is a soft vignette rather than a flat field, so even with the corners sampled to match exactly the lighter centre still reads as a rectangle. Edge-masking only feathered the border and left the interior showing. Syncing the overlay colour on a timer looked right but coupled the CSS to the image's own playback clock, which drifts.
  - Using a second copy of the image as the backdrop fails twice over. Blurred, it averages the dark lockup into the field and turns purple-grey. Magnified 9× from a corner instead — pure background, so the colour is right — it leaves a pale, soft fringe along the top and left edges, because `filter: blur()` samples past the element's bounds and there is nothing there to sample.
  - Shipped solution: the field is a plain background colour on the overlay, animated `#f2f2f4` -> `#06013b` by the `pl-field` keyframes over the clip's own 3.108s and started on the same event, so no second image and no artefacts. Measured: light through 2.3s, transitioning at 2.5s, fully navy by 2.8s against the clip's ~2.58s flip — the field lags very slightly, so the navy reads as expanding outward from the lockup. The clip is centred at up to its native 832px width, never stretched, with a vertical mask feathering its edges into the field.
- Behaviour: homepage only, first visit per session, per client direction. The gate runs in `<head>` before first paint so the overlay is never a flash over an already-rendered page. It is skipped entirely with JavaScript disabled, on `prefers-reduced-motion`, and after the first visit. A 5s hard timeout and an image `error` handler dismiss it regardless, so a slow or broken asset can never strand a visitor. On dismissal the hero word cascade is replayed so it runs as the overlay lifts rather than underneath it.
- All preloader markup, CSS and JS sit outside the shared shell region, so the other four pages are untouched and shell parity is unaffected.
- The 1.1MB source MP4 is not in the repo; it remains at `~/Downloads/digit-preload.mp4`. Worth archiving somewhere durable if the animation may need re-cutting.
- Verification: rendered at 1440×760 and, via a 390px iframe, at 390×844 — full-bleed with the lockup uncropped at both, dismissing cleanly to the homepage with no residual overlay. Sampled all four viewport edges at `#f2f2f4` exactly — uniform, no fringe. Compared 560px-stretched, 832px-stretched and 832px-native side by side before choosing; only the last is free of softening. Shell parity re-checked across all four derived pages; `node --check` passes. Note: a direct `--window-size=390` screenshot mis-frames the overlay, which is the documented 500px clamp artifact, not a layout fault — use the iframe.
- Files changed: `index.html`, `assets/digit-preloader.webp` (new), `AGENTS.md`.

### Working site header

- Built a real mobile navigation. Below 850px the shared shell set `.nav-links { display: none }` with nothing in its place, so every page on the site had no navigation on a phone beyond the logo and the call button — the long-standing site-wide issue recorded in `AGENTS.md`. The links and the CTA now collapse into a full-screen panel behind the header bar, opened by a burger that becomes a close cross, with `aria-expanded`/`aria-controls` wired, Escape to close, close on link tap, close on resize past the breakpoint, and background scroll locked while open.
- Fixed a stacking bug found while testing it: the panel is a descendant of `.nav`, which owns a `z-index: 10` stacking context, so the panel painted over the logo and the toggle — the open menu covered its own close button. `.nav-inner > .brand` and `.nav-toggle` now sit at `z-index: 11`.
- Unified the header across all five live pages, which had drifted badly. "Services" pointed at four different targets depending on the page (`#services`, `index.html#services`, `#strategy-hour`, `work-with-us.html`); it is now `work-with-us.html` everywhere. Added the missing Contact link, so the new contact page is reachable. `aria-current="page"` is now set consistently.
- Pointed the "Book a call" CTA at `contact.html#book` on every page instead of opening a raw `mailto:`, and at the on-page `#book` anchor on the contact page itself. Removed the now-redundant `data-booking` hook from the header CTAs; the in-page booking CTAs on `work-with-us.html` and `contact.html` keep theirs.
- The header markup, its CSS and its toggle script are byte-identical across all five pages. The shared shell region grew from lines 11–1817 to 11–1893; parity re-verified across `about-2.html`, `work-with-us.html`, `free-template.html` and `contact.html`.
- Verification: rendered the header at 1440px and, via a 390px iframe, in both closed and open states. DOM probe across all five pages at 1440px and 900px confirms identical link targets, the correct `aria-current` per page, the correct CTA target, the toggle hidden above the breakpoint, and no horizontal overflow. Confirmed in the open panel that the logo and close cross sit above it and the "Book a call" pill renders below the link list. `node --check` passes on every page's scripts.
- Files changed: `index.html`, `about-2.html`, `work-with-us.html`, `free-template.html`, `contact.html`, `AGENTS.md`.

### Contact page

- Added `contact.html`, following the client wireframe: message form in the main column (name, email, phone, an enquiry radio group and a message field), with the portrait, the direct booking route and the contact details in a narrower right column. Scoped to `.contact-static`, on the reduced About display scale.
- Resolved a naming conflict in the wireframe. It lists the third enquiry option as "The Numbers Hour", but the same offer is "The Strategy Hour" on `work-with-us.html` and the homepage, from the client's own earlier copy. Kept "The Strategy Hour" per client direction so the site has one name for one offer. Added a fourth "Something else" option, since the wireframe's three options would otherwise force every visitor into a named service.
- Corrected the wireframe's "The Investor-ready Financial Midela" to "The Investor-Ready Financial Model", matching the services page.
- Used the real Digit Finance contact details, not the wireframe's `hello@reallygreatsite.com` / `123 Anywhere St.` / `(123) 456 7890`, which are Canva template dummy text.
- Both integrations are unwired and each has one constant plus a mail fallback: `BOOKING_URL` for the Calendly/Meetergo link the wireframe calls for, and `FORM_ENDPOINT` for the form. The message fallback composes a mail draft carrying every field including the selected enquiry, and a `<noscript>` block covers the JavaScript-disabled case.
- Portrait: used `assets/sylvia.webp` at its native 1318×1600 ratio. `assets/sylvia-website.webp` was tried first and rejected — that asset has the standing subject's head cropped out in the source file, so no CSS crop can recover it. Recorded in `AGENTS.md`.
- Wrapped the footer in a navy `.contact-close` band. The shared `.footer` is a light-on-dark component and is invisible on paper; this is the same trap that had to be fixed on `free-template.html`.
- Set a real `<title>` and meta description for this page rather than inheriting the homepage's. This means lines 1–10 differ from `index.html`; the CSS shell, lines 11–1817, is byte-identical, which is the invariant that actually matters. `AGENTS.md` now states the parity rule in those terms, and records that three earlier pages still carry the homepage title.
- Verification: rendered at 1440×900 and a true 390px iframe across the full page. DOM probe at 1440/1180/390 confirms no horizontal overflow, all four `label[for]` targets resolve, the radio group carries `required`, the booking CTA resolves to the mail fallback, the nav CTA scrolls to the on-page booking block, and the closing band computes to `rgb(7, 0, 77)`. `node --check` passes on the page script.
- Files changed: `contact.html` (new), `AGENTS.md`.

### Free-template opt-in page — review fixes

- Fixed an unreadable footer. `.footer` is a light-on-dark component — it inverts the logo to white and sets its text to `rgba(250, 250, 250, 0.62)` — and on every other page it sits inside a dark section (`.closing` on the homepage, `.fit-band` on `work-with-us.html`). Here it had been placed directly on the paper body, so the logo, all contact and legal links, and the bottom line rendered white on cream. Wrapped it in a navy `.freebie-close` band, which also gives the page a proper ending rather than stopping on empty paper. Dropped the footer's top rule in this context since nothing sits above it.
- Fixed the template cover's spreadsheet grid, which was built on two mismatched rhythms. The ruled background was painted on `.sheet-grid`, whose box starts 26px above the cells because it includes the A/B/C/D header, so every row was offset; its row period was 25px against 12 rows in a 210px body (17.5px each), and its column period was 24.3% against tracks of 25%. The rules drifted across the sheet, left a sliver column at the right edge, and the orange input cells straddled the hairlines. The background now sits on `.sheet-body` and both periods derive from the same values as the grid tracks via a `--cell-h` custom property. Measured after the fix: header and body identical width and left edge, row height exactly 18.00px, and the orange cells at a 0.00px offset from their row boundary.
- Made the repeat CTA a navy pill button matching the hero, rather than the small underlined text link it had been. The wireframe shows a button, and on an opt-in page this is the second-biggest conversion element after the form itself.
- Added a `<noscript>` fallback to the signup form. `action=""` meant that with JavaScript blocked the form would post to the same URL and silently drop the entry; visitors now get the Digit Finance address instead.
- Verification: rendered at 1440×900 and a true 390px iframe across the full page. DOM probe at 1440/1180/390 confirms no horizontal overflow, the grid alignment figures above, the closing band computing to `rgb(7, 0, 77)`, and footer links to `rgba(250, 250, 250, 0.62)` — light on dark as intended. `node --check` passes on the page script. Shared-shell parity (`index.html` vs `about-2.html`, lines 1–1817) still holds; `index.html` was not touched in this pass.
- Files changed: `free-template.html`.

### Free-template opt-in page

- Added `free-template.html`, a homepage-derived orange free-resource page with the only template signup form, a CSS-built workbook cover, supplied narrative copy, what-you-get rules list, second CTA, and the shared Digit Finance footer.
- Applied the approved source-copy corrections: “so they start with a vision” and typographic curly apostrophes in “won’t” and “you’re”. The wireframe’s non-brand red treatment is represented by the established orange left rule instead.
- Added `FORM_ENDPOINT = ""` with a prefilled `mailto:hello@digitfinance.com` fallback, so an unwired form cannot silently swallow a signup. A real template screenshot may replace the marked CSS cover later.
- Updated only the permitted cross-page routes: the homepage free-resource form is now a `free-template.html` link; Free navigation in `index.html`, `about-2.html`, and `work-with-us.html` now points to the new page. Added the scoped homepage `.resource-cta` after the 1,817-line parity boundary.
- Verification: reviewed local Chrome renders at 1440×900 and 1180×820 plus a true 390px iframe; confirmed clean visible layout at each. Chrome DOM probes found no horizontal overflow at desktop, mid-size, or mobile widths; both reveal targets reached opacity 1; the hero fragment places the form in view; labels map to their inputs; and the default focus order is name, email, submit. Also checked shared-shell parity, local paths, JavaScript syntax, and `git diff --check`. The selected email-provider endpoint remains the only open implementation item.

## 2026-09-04

### Work with us — full-height accordion offer rail

- Rebuilt the desktop offer index as a full-height accordion, per client direction that the empty space below the three entries served no purpose. The rail is now `height: 100vh` with the entries as flex children dividing it between them, so the column is filled edge to edge with no dead space at any scroll position.
- Made the entries flush to the panel divider. They previously stopped 28px short because of the rail's right padding; verified the entry right edge and the offer panel's left edge now both sit at x=264.
- Enlarged the entries and restructured them to two lines — an orange numeral over the offer name — instead of a single small "01 / Strategy hour" string. Widened the rail column from 220px to 264px to carry it.
- Added the open/shut transition: the active entry animates to `flex-grow: 1.9` while the other two compress to make room (measured 374px active vs 219/220px inactive at a 900px viewport), over 0.6s on the site's existing easing curve. The active numeral scales up and inactive offer names sit at 62% opacity, lifting to full on hover. The rail remains scroll-driven only, so it cannot disagree with the page about which offer is active.
- The mobile chip row explicitly unwinds the accordion (`height: auto`, row direction, no flex-grow on the active chip) and restores the inline "01 / Strategy hour" form via a `::after` separator.
- Reduced motion is already covered by the shell's global `transition-duration: 0.01ms !important` rule; no separate override needed.
- Verification: rendered at 1440x900, 1180x820 and a true 390px iframe. Confirmed via DOM probe that the three entry heights sum exactly to the rail height (219+374+220=813) with no leftover space, that entries are flush to the divider, that the active entry tracks the scrolled panel, and that there is no horizontal overflow. Note: `--screenshot` cannot capture a scrolled state, so rail screenshots use a same-origin iframe scrolled via `--allow-file-access-from-files`.

### Work with us — client copy restored and rendered QA

- Restored the client's supplied copy for all three offers, which the first pass had replaced with the homepage's one-line service summaries and three invented inclusion bullets per offer. The page now carries the real narrative paragraphs, the full eight-item inclusion lists for the Financial Model and the Fractional CFO Partnership, the stage-specific "Who this is for" text, and the client's own offer names and terms ("Delivered in 2–4 weeks", "Minimum 3 months", "Investment: From £2,500 / £3,000/month").
- Added the hero standfirst ("Your financial model shouldn't just add up…") and the closing band's free 20-minute call paragraph, both of which were missing.
- Removed four client-facing italic hedges that were rendering on the page: three "Expanded inclusion list to be confirmed with Sylvia" notes and one "Client decision pending" note about the Strategy Hour. The client had already supplied those lists, so there was nothing outstanding to caveat. The booking-URL question remains a real open item but belongs in this log, not in the page.
- Applied the reduced display scale used on `about-2.html` rather than the homepage's larger scale, per the standing client direction that Sylvia does not want very large headings. The hero drops from ~134px to ~101px at 1440px, offer headings from ~98px to ~64px, and the closing headline from ~106px to ~79px, with the mobile sizes stepped down to match.
- Made `.offer-lede` sticky on desktop so the numeral, offer name and price chips travel alongside a long inclusion list. With the real copy in place the panels are 1200–1300px tall; previously the lede stranded at the top and left roughly 400px of dead space in the lower left of every panel.
- Fixed two IntersectionObserver thresholds that could not fire against the now taller panels. `[data-reveal]` used `threshold: 0.15` and the offer-index scrollspy used `threshold: 0.5`; an offer panel is taller than the viewport, so on a shorter laptop viewport the ratio needed for the scrollspy was unreachable and the rail stayed pinned to "01 / Strategy hour" for the whole page. Both now key off viewport position via `rootMargin` (`0 0 -12% 0` and `-45% 0 -45% 0`), which is height-independent.
- Set "Investor-Ready" to `white-space: nowrap` in the offer heading. "The Investor-Ready Financial Model" was breaking at the hyphen and stranding "READY" on its own line; it now breaks as THE / INVESTOR-READY / FINANCIAL MODEL at both 1440px and 1180px.
- Verification: rendered in Chrome at 1440px, 1180px and a true 390px iframe across the full page. Confirmed via an in-page DOM probe that deep links land correctly (`#financial-model` → scrollY 1593, `#fractional-cfo` → scrollY 2824), that the target panel is revealed (`opacity: 1`), that the rail's active entry follows the panel, that the sticky lede engages, and that `documentElement.scrollWidth` does not exceed `clientWidth` at any tested width. Note for future sessions: headless Chrome does not complete `scroll-behavior: smooth` fragment jumps under `--virtual-time-budget`, so screenshots taken with a `#fragment` URL render an unrevealed, apparently blank page. That is a harness artifact, not a page fault — force `scrollBehavior = "auto"` and scroll explicitly before measuring.
- Files changed: `work-with-us.html`. No changes to `index.html` in this pass.

### Work with us service dossier

- Added `work-with-us.html`: a homepage-derived services dossier with a desktop sticky offer index, a mobile scroll-snapping offer index, and three full-bleed alternating offer panels for Strategy Hour, Financial Model, and Fractional CFO.
- Added safe booking-link handling with one empty `BOOKING_URL` constant and a `mailto:hello@digitfinance.com` fallback. The Strategy Hour paid-session decision and expanded inclusion lists are visibly marked for client confirmation.
- Used real Digit Finance contact details and the supplied Sylvia portrait once in the closing band. Added `<!-- ASSET PENDING -->` markers for the missing offer photography without creating visual placeholder blocks.
- Repointed only the three homepage service links in `index.html` to `work-with-us.html#strategy-hour`, `#financial-model`, and `#fractional-cfo`.
- Verification: confirmed the three homepage link targets, offer copy/prices, booking hooks, local asset paths, JavaScript syntax, and `git diff --check`. Desktop and true 390px iframe rendering could not be run because no browser or local Chrome executable is available in this session.

## 2026-09-04

### Client-wireframe About-page rebuild

- Rebuilt `about-2.html` to the supplied wireframe's content and section order: hero headline and founder bio, four metrics, philosophy quote, founder story, "Every number has a story" statement, the fractional-partner quote, Mission and Vision, Values, and the closing call to action.
- Changed the page's structural approach from photography-led to typography-led. The earlier revision reused the homepage's image-split component three times and filled the empty slots with labelled placeholder boxes, which read as unfinished rather than designed. Visual weight is now carried by full-bleed panels, oversized numerals, hairline rules and large-scale type, so the page holds up with the two photographs that actually exist.
- Removed all four placeholder asset boxes and the earlier gradient texture blocks. The hero uses `assets/sylvia.webp` and the founder story uses `assets/sylvia-website.webp` with a distinct crop; neither repeats the other's homepage treatment.
- Replaced the wireframe's third image slot and its signature graphic with typographic treatments: the fractional quote became a two-column pull quote, and the philosophy attribution became a ruled credit line. Both can take real assets later without structural change.
- Removed the sections the wireframe does not contain (logo band, free-resource form, four-step process grid) and cut three passages that had appeared twice.
- Fixed the metric counters, which never visibly animated: the metrics band sits above the statement, but counting had been chained to the statement's word cascade further down the page, so the numbers had scrolled past before firing. Counting is now driven by the shared reveal observer on viewport entry, and `revealStaticStatement` handles words only.
- Fixed the empty right-hand lane left in the Values rows after arrow removal, tightened the dead band between the adjacent dark Values and closing sections, widened the philosophy quote so it no longer occupies only the left half of its panel, and re-set the longer closing headline so it breaks sensibly.
- All About-specific CSS is scoped to `.about-static` per `AGENTS.md`. Lines 1–1817 remain byte-identical to `index.html`.
- Applied the three previously approved copy corrections: the missing "W" in "What makes Sylvia rare", "happy-ending" to "happy ending", and the doubled period ending the philosophy quote.
- Outstanding client assets: an on-stage authority portrait, two "Sylvia working with a person" photographs, and Sylvia's signature graphic. The wireframe calls for all four; none exist in `assets/`. The page is designed to read as finished without them.
### Mobile verification and fixes

- Established a working method for true small-screen QA. Headless Chrome clamps its layout viewport to a 500px minimum, so `--window-size=390` silently rendered at 500px and clipped content — this affected `index.html` identically and was the reason earlier sessions could not verify mobile. Rendering the page inside a 390px `<iframe>` gives it a real 390px layout viewport and produces accurate screenshots.
- Fixed the About hero headline on mobile: at the previous size, two of the four authored lines wrapped and stranded single words ("THEM", "NUMBERS,"). Reduced the mobile scale so each authored line fits its own row.
- Fixed the hero panel at 390px: the founder bio filled the panel, leaving `justify-content: space-between` with no slack, so the "About the founder" label and the "Fractional CFO / US · UK · EU" footer collided with the copy. Added an explicit gap and panel padding and set the bio sizes for that width.
- Fixed the metrics band at 390px: stacked one-up, the desktop `min-height` stranded each label far below its numeral. The numeral and its label now sit together.
- Verified the remaining sections at a true 390px: founder story, statement, fractional quote, Mission/Vision, Values rows, closing CTA and footer all hold up without changes.
- Known site-wide issue, not introduced here and not fixed here: `index.html:913` sets `.nav-links { display: none }` below the mobile breakpoint with no replacement menu, so every page loses its navigation on phones apart from the logo and the "Book a call" button. This lives in the shared shell that must stay byte-identical, so it needs a deliberate site-wide decision (burger menu or a condensed mobile nav).

### Quieter About-page display scale

- Client direction: Sylvia does not like very large headings. Reduced the About page's display type by roughly 25%, scoped entirely to `.about-static` so `index.html` keeps its original scale. At 1440px the hero moves from 92px to 69px, "A broader perspective" 118px to 88px, "Values we live by" 115px to 86px, the value rows 75px to 56px, and the closing headline 121px to 91px. The philosophy quote, fractional quote, statement, Mission/Vision headings and supporting intro text were stepped down proportionally so the internal hierarchy holds.
- Scaled the section rhythm to match. The homepage's vertical padding is tuned for its larger type and left visible dead space around the reduced headings, so section padding, label margins, value-row height and metric height were all brought down in proportion.
- Re-set line-break constraints that were tuned for the previous sizes: the hero, closing and "Values we live by" `max-width` values were adjusted so none of them break to an orphan word.
- Decision recorded: this is an About-only divergence, chosen deliberately over changing the homepage. The two pages now differ in display scale. If Sylvia wants the same treatment on the homepage, the same reductions apply to the unscoped rules in `index.html`.
- Verification: confirmed lines 1–1817 are byte-identical to `index.html`; every selector in the About override block carries the `.about-static` scope; no heading-scale changes leaked into `index.html`; each of the nine sections appears exactly once; no placeholder, texture, arrow, logo-band, resource-form or process-grid markup remains in the body; the three duplicated strings each appear once; the copy corrections are applied; all local asset paths resolve; JavaScript passes `node --check`; `git diff --check` is clean. Reviewed rendered desktop (1440px) and tablet (820px) screenshots across the full page. Sub-400px rendering could not be verified in this session: the headless browser clips content at that width on `index.html` too, so the artifact is not specific to this page.

## 2026-09-03

### Homepage-native About-page rebuild

- Rebuilt `about-2.html` after the shared homepage shell, preserving the first 1,817 lines byte-for-byte with `index.html` and scoping the remaining About-specific rules to `.about-static`.
- Restored the homepage’s nine-beat composition: hero, statement and metrics, values, four-part experience grid, founder split, client-logo band, philosophy panel, Mission/Vision pair, and closing/footer.
- Removed duplicated image/content treatments and false service-row arrows; the hero portrait is eager, below-fold imagery is lazy-loaded, and all images now include async decoding and meaningful alt text.
- Replaced the static statement’s instant reveal with a one-time observer-driven word cascade followed by metrics; reduced-motion behavior remains immediate.
- Verification: first 1,817 lines match `index.html`; confirmed nine component sections, no About-page texture or service-arrow markup, expected copy occurrences, resolving asset paths, JavaScript syntax, and `git diff --check`. Rendered browser QA remains unavailable because no in-app browser is connected.

## 2026-09-01

### About page polish and accessibility

- Fixed the single-quote and two-card grid layouts in `about-2.html`, removing empty desktop lanes and making Mission/Vision a deliberate two-column layout that stacks on mobile.
- Replaced duplicate below-fold photographs with decorative navy/blue texture blocks, added the mid-page investor-readiness CTA, and preserved the existing motion hooks.
- Corrected static About scroll-reveal math, reduced the mobile hero title scale, improved copy wrapping and section separation, and added safe footer-year initialization.
- Added image decoding/loading hints, meaningful alt text, decorative texture semantics, and accessible CTA/arrow labeling.
- Verification: confirmed the requested grid counts, image occurrence/texture counts, local paths, JavaScript syntax, and `git diff --check`.

## 2026-08-31

### Homepage-derived About variant

- Added `about-2.html` by preserving the `index.html` document shell, CSS, motion code, responsive rules, and footer, then replacing only the main-page content with the About wireframe sequence.
- Reused homepage hero, statement, metrics, About grid, testimonials, resource, process, services, closing CTA, and service-row hover components without introducing a parallel design system.
- Refined the About-specific flow: removed the repeated leadership statement, corrected the four-stat metric layout, assigned the boardroom image to the founder story, and added the fractional-partner story section while retaining homepage component styling.
- Corrected two homepage-only behaviors that were breaking the About composition: desktop headline clipping from `white-space: nowrap` and the sticky Partnership scroll spacer that created a large blank gap after the metrics.
- Rebalanced the About hero headline for its longer three-line copy by removing the homepage-only right alignment, tightening the desktop scale, and applying the orange emphasis to “numbers.”
- Updated both homepage About links to point to `about-2.html`; retained `about.html` as the earlier reference prototype.
- Verification: confirmed the homepage-derived file contains the shared design shell, all local assets resolve, JavaScript syntax passes, and `git diff --check` passes.

### Dedicated About page

- Added `about.html` as a complete founder page based on the supplied wireframe content and the visual system established by `index.html`.
- Added the founder introduction, four animated proof metrics, philosophy quote and name treatment, alternating story sections, mission and vision panels, values, and a “Work with us” closing call to action.
- Reused the existing Sylvia portrait and boardroom photography with distinct editorial crops, plus the homepage navigation, typography, colors, motion language, contact details, and footer.
- Updated the homepage About navigation item to open `about.html` and added a “Learn more about Sylvia” link to the existing About teaser.
- Corrected only the approved typographical issues in the supplied copy: the missing “W” in “What,” the “happy ending” hyphenation, and the duplicated quote-ending period.
- After rendered-page review, aligned the About page strictly to the homepage’s established type scales, section spacing, gradient roles, supporting-text sizes, image treatment, buttons, and service-row hover behavior; removed the invented orange manifesto treatment and replaced the repeated boardroom crop.
- Reduced the philosophy quotation from the homepage statement scale to the homepage testimonial quote scale so the long copy remains readable instead of becoming a clipped wall of text.
- Verification: reviewed the supplied full-page desktop render, then confirmed all local links and assets used by `about.html` resolve, both homepage About links are present, the About-page JavaScript passes syntax validation, and `git diff --check` passes. A fresh post-revision desktop render and mobile browser review remain pending because no in-app browser is connected in this session.

### Active page naming

- Renamed the earlier `index.html` design to `old-design.html`.
- Promoted the blue-resource editorial variant from `editorial-comment-blue-resource.html` to the main `index.html` entry point.
- Renamed the standard editorial variant from `editorial-comment.html` to the root-level `index-2.html`.
- Updated `AGENTS.md` to document the new active-page roles and distinguish the root-level `index-2.html` from the archived `playground/index-2.html`.
- Verification: confirmed all three renamed pages exist, are non-empty, and resolve every referenced asset. Visual browser review remains unavailable because no in-app browser is connected in this session.

### Asset and prototype organization

- Moved all root-level image assets into `assets/` and updated local image references in `index.html`, `editorial-comment.html`, and `editorial-comment-blue-resource.html`.
- Moved `index-2.html`, `editorial-codex.html`, and `editorial-playground.html` into `playground/` without changing their contents.
- Preserved `editorial-comment-pre-animations.html` unchanged as the clean historical backup; its original root-relative image references are intentionally not maintained.
- Updated `AGENTS.md` with the active-page, asset-directory, and archived-prototype conventions.
- Verification: confirmed the archived HTML files are byte-identical to their pre-move Git versions, all local asset references in the three active pages resolve, and `git diff --check` passes. Desktop/mobile browser review was unavailable because no in-app browser was connected in this session.

## 2026-08-14

### Service pricing removal

- Removed all three displayed service prices from `editorial-comment.html` while preserving the services and their descriptions.
- Applied the same pricing removal to `editorial-comment-blue-resource.html` so both editorial variants remain synchronized.
- Removed the now-unused service-price styling; retained the `€250M+` capital-raised metric because it describes client outcomes rather than a service price.
- Verification: confirmed no service-price markup or pricing amounts remain; reviewed the surrounding desktop and mobile CSS rules for layout regressions. Browser-based visual QA was unavailable in this session.

## 2026-08-12

### Editorial mockup typography

- Increased small supporting text throughout `editorial-comment.html`, including the header navigation, metadata, section labels, service and process details, form labels and buttons, testimonial details, calls to action, and footer.
- Preserved the existing layout, hierarchy, content, colors, and motion system.
- Verification: reviewed the final CSS cascade to ensure the new sizes override the earlier small-text declarations while retaining responsive rules.

### Partnership scroll sequence

- Adjusted the Partnership animation so the statement finishes revealing at 74% scroll progress, remains fully visible for a short pause, and then reveals all three metrics together from 82% to 100%.
- Removed the previous overlap in which the metrics started appearing before the statement was complete.
- Corrected the per-word reveal calculation so the final words now reach full opacity before the metrics are permitted to appear.
- Removed the metrics container from the general viewport observer, which had been starting the count immediately on entry. Metric counting is now triggered exclusively by the Partnership scroll sequence after the statement finishes.

### Section heading scale

- Reduced the oversized section headings for Services, Process, About, the free resource, and the closing call to action.
- Reduced “Ready to make the numbers work?” further so the size change is visually clear and better aligned with the other section headings.
- Kept the hero headline unchanged and preserved the existing typography, line heights, and responsive scaling behavior.

### Footer branding

- Replaced the footer’s “Digit Finance” heading and descriptive paragraph with the existing Digit Finance logo.
- Rendered the logo in white for clear contrast against the dark footer background.

### Testimonial layout

- Replaced the boxed testimonial treatment with three open, side-by-side editorial columns.
- Used subtle vertical dividers instead of card outlines, with founder details anchored beneath each quote.
- Kept a borderless stacked treatment for smaller screens where three horizontal columns would be unreadable.

### Service descriptions

- Increased the service description and price text to `0.95rem` with slightly more line spacing for easier reading.

### Blue resource-section variant

- Created `editorial-comment-blue-resource.html` as a complete duplicate for client comparison, leaving `editorial-comment.html` unchanged.
- Changed only the free-resource section’s visual treatment: deep-blue radial gradient, white supporting text and form controls, and an orange call-to-action button.

### Closing call-to-action contrast

- In `editorial-comment.html`, changed the final “Book a call” button from blue to orange with navy text so it stands out clearly against the blue gradient background.
- Kept a white hover state and left `editorial-comment-blue-resource.html` unchanged pending later synchronization.

### Comprehensive mobile refinement

- Refined both editorial variants for screens up to 640px, including navigation sizing, hero proportions, Partnership pacing and metrics, section spacing, heading scale, service rows, process steps, About content, logos, resource form, testimonials, closing CTA, and footer.
- Synchronized the orange closing “Book a call” treatment into `editorial-comment-blue-resource.html`.
- Preserved the sole intended visual difference between the two pages: the resource section remains orange in `editorial-comment.html` and blue in `editorial-comment-blue-resource.html`.

### Project documentation

- Added `AGENTS.md` to preserve existing client work, require reviewable edits and verification, and maintain durable project context.
- Documented known production-readiness concerns in `editorial-comment.html`, including placeholder content/actions and missing service-page targets.
- Verification: confirmed the documentation files are saved in the project root and inspected the current Git working-tree status.
