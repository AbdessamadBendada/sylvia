# Project Working Agreement

## Preserve work and project context

- Treat every existing file and uncommitted change as important client work. Never discard, overwrite, reset, or delete it unless the user explicitly approves the exact destructive action.
- Before any substantial edit, inspect the relevant file, nearby variants/backups, and current Git status. Work narrowly and preserve unrelated changes.
- Make changes with reviewable patches. For broad or risky revisions, create a clearly named backup or checkpoint first when one does not already exist.
- After editing, verify the result at an appropriate desktop and mobile size and run any relevant checks available in the project.

## Maintain a durable change record

- Keep this file updated with durable project rules and important implementation context discovered during future work.
- Record completed work in `CHANGELOG.md` with the date, files changed, a concise description, important decisions, and verification performed.
- Do not claim a change is complete until it is saved to disk and verified. In the final handoff, name the files changed and the checks performed.
- Do not store secrets, credentials, personal data, or verbose transient debugging notes in project documentation.

## Current project context

- `index.html` is the main client-review entry point and contains the former blue-resource editorial variant.
- `index-2.html` contains the former standard editorial variant, and `old-design.html` contains the earlier site design. Their local image paths point into `assets/`.
- Experimental prototypes `index-2.html`, `editorial-codex.html`, and `editorial-playground.html` from before the 2026-08-31 reorganization are archived unchanged in `playground/`. Their historical asset paths are intentionally not maintained; `playground/index-2.html` is distinct from the current root-level `index-2.html`.
- The root-level `index-2.html` is a client-review landing-page prototype for Digit Finance.
- It contains explicit placeholder copy for the process and testimonials, nonfunctional placeholder form actions, placeholder contact/legal links, and links to service pages that may not yet exist. These must not be treated as production-ready without confirmation.
- `editorial-comment-pre-animations.html` is identified in the source as the clean pre-animation backup. Preserve it unless the user explicitly asks to update or remove it.
- Because that backup must remain source-identical, its original root-relative image paths are historical and will not resolve after the assets cleanup unless a future user explicitly authorizes updating a copy.
