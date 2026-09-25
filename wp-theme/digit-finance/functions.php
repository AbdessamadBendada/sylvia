<?php
/**
 * Digit Finance — theme bootstrap.
 *
 * Deliberately small. No custom blocks, no build step, no ACF.
 * Patterns in /patterns are auto-registered by WordPress.
 *
 * @package DigitFinance
 */

defined( 'ABSPATH' ) || exit;

/**
 * Theme supports.
 */
add_action(
	'after_setup_theme',
	static function (): void {
		add_theme_support( 'wp-block-styles' );
		add_theme_support( 'responsive-embeds' );
		add_theme_support( 'editor-styles' );
		add_editor_style( 'style.css' );
	}
);

/**
 * Register the pattern category Sylvia sees in the inserter.
 *
 * This is what makes "add a section" work: Pages > Home > + > Patterns >
 * Digit Finance Sections.
 */
add_action(
	'init',
	static function (): void {
		if ( ! function_exists( 'register_block_pattern_category' ) ) {
			return;
		}

		register_block_pattern_category(
			'digit-finance',
			array(
				'label'       => __( 'Digit Finance Sections', 'digit-finance' ),
				'description' => __( 'Ready-made sections for the Digit Finance site.', 'digit-finance' ),
			)
		);
	}
);

/**
 * Front-end assets.
 */
add_action(
	'wp_enqueue_scripts',
	static function (): void {
		$theme   = wp_get_theme();
		$version = $theme->get( 'Version' ) ?: '1.0.0';

		wp_enqueue_style(
			'digit-finance-fonts',
			'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500&family=Stack+Sans+Headline:wght@500;700&display=swap',
			array(),
			null
		);

		wp_enqueue_style(
			'digit-finance',
			get_stylesheet_uri(),
			array( 'digit-finance-fonts' ),
			$version
		);

		wp_enqueue_script(
			'digit-finance-motion',
			get_theme_file_uri( 'assets/js/motion.js' ),
			array(),
			$version,
			array(
				'in_footer' => true,
				'strategy'  => 'defer',
			)
		);
	}
);

/**
 * Preconnect to the font CDN so the display font is not a late paint.
 */
add_filter(
	'wp_resource_hints',
	static function ( array $hints, string $relation ): array {
		if ( 'preconnect' === $relation ) {
			$hints[] = array(
				'href'        => 'https://fonts.gstatic.com',
				'crossorigin' => 'anonymous',
			);
		}

		return $hints;
	},
	10,
	2
);
