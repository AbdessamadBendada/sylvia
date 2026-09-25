# Digit Finance WordPress theme

This is the canonical native Gutenberg block theme for the approved Digit Finance website. It is a standalone block theme and has no parent-theme, plugin, Divi, or custom-block dependency.

## Current scope

- Editable native-block header.
- Editable Hero section.
- Editable Partnership statement and three metrics.
- Homepage-only preloader.
- Approved scroll and entrance motion implemented in isolated CSS and JavaScript.

The normal content remains standard WordPress blocks: Groups, Navigation, Image, Heading, Paragraph, Quote, and Buttons. The JavaScript only enhances behavior and never stores client content.

## Editing

The header is edited in **Appearance → Editor → Design → Patterns → Manage my patterns → Header**.

The homepage sections are regular page blocks. Headings, copy, image, quote, labels, metric values, navigation links, and the call-to-action can all be edited through WordPress without touching code.

The editable starter composition is available in the inserter under **Patterns → Digit Finance → Homepage — Hero and Partnership**.

## Code map

- `theme.json` — colors, typography, spacing, and editor controls.
- `patterns/site-header.php` — native editable header blocks.
- `patterns/homepage-start.php` — native editable Hero and Partnership blocks.
- `assets/css/navigation.css` — header layout and responsive navigation.
- `assets/css/homepage.css` — exact section styling and responsive layout.
- `assets/css/preloader.css` — homepage preloader presentation.
- `assets/js/homepage-motion.js` — title, portrait, quote, statement, and metric animation.
- `assets/js/preloader.js` — homepage-only, first-visit-per-session preloader behavior.

## Requirements

- WordPress 6.7 or newer.
- PHP 7.4 or newer.
- No required plugins.
