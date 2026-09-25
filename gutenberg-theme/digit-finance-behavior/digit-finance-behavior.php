<?php
/**
 * Plugin Name: Digit Finance Behaviour
 * Description: Homepage-only motion enhancements for the Digit Finance block theme.
 * Version: 0.1.1
 * Requires at least: 6.6
 * Requires PHP: 8.1
 * Text Domain: digit-finance-behaviour
 *
 * @package DigitFinanceBehaviour
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Loads only on the assigned homepage. The page stays fully usable if this
 * plugin is inactive or JavaScript is unavailable.
 */
add_action(
	'wp_enqueue_scripts',
	static function (): void {
		if ( ! is_front_page() ) {
			return;
		}

		$version = '0.1.1';
		wp_enqueue_style(
			'digit-finance-behaviour',
			plugin_dir_url( __FILE__ ) . 'assets/home-motion.css',
			array(),
			$version
		);
		wp_enqueue_script(
			'digit-finance-behaviour',
			plugin_dir_url( __FILE__ ) . 'assets/home-motion.js',
			array(),
			$version,
			true
		);
		wp_add_inline_script(
			'digit-finance-behaviour',
			'window.DigitFinanceMotion = ' . wp_json_encode(
				array(
					'preloaderImage' => plugin_dir_url( __FILE__ ) . 'assets/digit-preloader.webp',
				)
			),
			'before'
		);
	}
);
