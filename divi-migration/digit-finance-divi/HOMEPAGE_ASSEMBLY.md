# Homepage assembly in Divi 5

This plugin supplies only two custom modules: **Digit Hero** and **Statement & Metrics**. Build every other homepage section with native Divi 5 modules and Group modules. This keeps routine copy, image, link and testimonial edits in the standard Visual Builder.

## Global rules

- Build the header and footer in Divi Theme Builder. Use native Menu, Image, Text, Link/Button and Email Optin modules; use a Canvas for the mobile menu.
- For every homepage section row, add the `dfd-shell` class in **Advanced > Attributes**. For Hero and Statement rows, use `dfd-raw-row` instead.
- Apply the named classes below through **Advanced > Attributes**, never generated `et_pb_*_N` classes.
- Set an Aspect Ratio and Framing on every native Image module. Use the Media Library for all client-editable imagery.
- The plugin loads its CSS, JavaScript and preloader only where WordPress reports `is_front_page()`.

## Section map

| Section | Divi structure | Classes to add | Editable content |
|---|---|---|---|
| Hero | One-column Section/Row > **Digit Hero** | Row: `dfd-raw-row` | Every hero field, image and alt text in the custom module |
| Partnership | One-column Section/Row > **Statement & Metrics** | Row: `dfd-raw-row` | Label, statement, three values and three descriptions |
| Services | Section > Row > Group (heading) + Group (list) > three Service Groups | Section: `services`; heading: `services-head`; list: `service-list`; item: `service`; child modules: `service-index`, `service-info`, `service-arrow` | Heading, intro, each service title, description and link |
| Process | Section > Row > Label Text + Heading Text + Group > four Step Groups | Section: `process`; grid: `process-grid`; item: `process-step`; heading: `editorial-heading`; note: `content-note` | Label, title and every step’s number, title and body |
| Founder | Section > Row > Image Group + Content Group | Section: `about`; row: `about-grid`; image group: `about-image`; content: `about-copy`; child text/link modules: `section-label`, `about-title`, `about-intro`, `about-body`, `about-pull`, `about-link` | Portrait, copy and detail-page link |
| Client logos | Section > Row > Group with Text and three Image modules | Section: `logos`; group: `logos-inner` | Strip label and each logo/image alt text |
| Free template | Section > Row > Group (copy) + native Link/Button | Section: `resource`; row: `resource-grid`; copy: `resource-copy`; label: `section-label`; CTA: `resource-cta` | Copy, CTA label and URL |
| Testimonials | Section > Row > Label Text + Heading Text + Group > three Testimonial Groups | Section: `testimonials`; list: `quote-list`; item: `quote-row`; attribution: `quote-person`; heading: `editorial-heading` | Quote, name, role/company and optional photo |
| Closing CTA | Section > Row > Heading Text + Group with Text and Button | Section: `closing`; group: `closing-row`; button: `closing-button` | Heading, paragraph, button label and URL |

For service items, use native Text modules for the index, heading and description, plus a native Link module for the CTA arrow. The Group itself is deliberately not a custom module: the client can add, remove, reorder and edit services with normal Divi controls.

## Motion

- Keep the custom Hero word cascade, image reveal, sticky statement word reveal, metric timing and counters enabled through this plugin.
- Use Divi’s native viewport interactions for ordinary section reveals where desired. Do not port the old optional editorial-motion system; it was intentionally disabled in the approved HTML because it conflicts with the primary observer.
- The preloader is injected only on the homepage, skipped for reduced motion and after the first visit in a session. Replace its packaged WebP by filtering `dfd_preloader_url` if a revised client asset is supplied.

## Staging verification

1. Install and activate this plugin on a Divi 5 staging site.
2. Assemble the front page using this guide; do not use the retired `Service List` module.
3. Check the Hero and Statement module panels save and render on the frontend.
4. Test desktop, tablet and phone breakpoints, reduced motion, and a second homepage visit in the same browser session.
5. Clear Divi Static CSS after changing classes or global styles.
