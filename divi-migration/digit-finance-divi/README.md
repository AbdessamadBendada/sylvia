# Digit Finance — Divi Homepage Modules

This is a WordPress plugin package for the approved Digit Finance homepage. It is intentionally kept separate from WordPress in this repository; nothing has been installed or activated.

## Included

- `Digit Hero`: editable eyebrow, supporting text, heading, accent word, image, alt text, quote, and panel labels.
- `Statement & Metrics`: editable statement and three editable metric groups, including count targets and prefix/suffix values.
- `assets/home.css` and `assets/home.js`: the approved homepage shell styles and custom behavior needed only for the Hero and Statement.
- `assets/preloader.css`, `assets/preloader.js`, and `assets/digit-preloader.webp`: the homepage-only animated preloader.
- `assets/divi5-modules.js`: guarded Divi 5 module-library bridge using Divi's Visual Builder asset manager and vendor WordPress hooks. The PHP modules remain the safe server-rendered fallback for Divi installations that expose the legacy module API.
- `HOMEPAGE_ASSEMBLY.md`: the native Divi Group/module map for Services, Process, Founder, Logos, Free Template, Testimonials and Closing CTA.

## Installation later

Copy this directory to `wp-content/plugins/digit-finance-divi/`, activate it, and test in a staging WordPress site with Divi 5 active. The plugin does not create pages, change Theme Builder layouts, upload media, or alter existing WordPress data.

The homepage still needs to be assembled in the Visual Builder using the native header, footer, Services, Process, Founder, Logo, Free Template, Testimonial and Closing CTA groups around these modules. Upload the approved media through WordPress and set the Hero image field to its Media Library URL. The retired custom `Service List` module is intentionally not part of this package.

## Verification status

JavaScript syntax and static structure can be checked locally. Visual Builder registration, module-panel persistence, and live preview require a real WordPress + Divi 5 installation; those runtime checks are not possible in this repository-only environment.
