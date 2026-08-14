# Project Change Log

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
