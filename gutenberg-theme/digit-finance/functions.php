<?php
/**
 * Digit Finance theme bootstrap.
 *
 * @package DigitFinance
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action(
	'wp_enqueue_scripts',
	static function (): void {
		wp_enqueue_style(
			'digit-finance-fonts',
			'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400&family=Stack+Sans+Headline:wght@500;700&display=swap',
			array(),
			null
		);
		wp_enqueue_style(
			'digit-finance-layout',
			get_theme_file_uri( 'assets/layout.css' ),
			array(),
			wp_get_theme()->get( 'Version' )
		);
	}
);

add_action(
	'after_setup_theme',
	static function (): void {
		add_theme_support( 'wp-block-styles' );
		add_theme_support( 'editor-styles' );
		add_editor_style( 'assets/layout.css' );
	}
);
