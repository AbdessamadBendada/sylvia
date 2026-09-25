<?php
/**
 * Title: Site header
 * Slug: digit-finance/site-header
 * Categories: header, digit-finance
 * Block Types: core/template-part/header
 * Inserter: no
 *
 * @package DigitFinance
 */
?>
<!-- wp:group {"tagName":"header","className":"df-site-header","layout":{"type":"default"}} -->
<header class="wp-block-group df-site-header"><!-- wp:group {"className":"df-shell","layout":{"type":"default"}} -->
<div class="wp-block-group df-shell"><!-- wp:image {"sizeSlug":"full","linkDestination":"custom","href":"/","className":"df-site-logo"} -->
<figure class="wp-block-image size-full df-site-logo"><a href="/"><img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/logo.png' ) ); ?>" alt="Digit Finance"/></a></figure>
<!-- /wp:image -->

<!-- wp:navigation {"overlayMenu":"mobile","className":"df-primary-navigation","layout":{"type":"flex","justifyContent":"center"}} -->
<!-- wp:navigation-link {"label":"Approach","url":"/#approach","kind":"custom"} /-->
<!-- wp:navigation-link {"label":"Services","url":"/services/","kind":"custom"} /-->
<!-- wp:navigation-link {"label":"About","url":"/about/","kind":"custom"} /-->
<!-- wp:navigation-link {"label":"Free","url":"/free-template/","kind":"custom"} /-->
<!-- wp:navigation-link {"label":"Contact","url":"/contact/","kind":"custom"} /-->
<!-- wp:navigation-link {"label":"Book a call","url":"/contact/#book","kind":"custom","className":"df-mobile-menu-cta"} /-->
<!-- /wp:navigation -->

<!-- wp:buttons {"className":"df-header-cta","layout":{"type":"flex","justifyContent":"right"}} -->
<div class="wp-block-buttons df-header-cta"><!-- wp:button -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="/contact/#book">Book a call</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group --></header>
<!-- /wp:group -->
