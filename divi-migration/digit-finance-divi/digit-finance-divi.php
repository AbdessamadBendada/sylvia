<?php
/**
 * Plugin Name: Digit Finance — Divi Homepage Modules
 * Description: Editable Divi modules and the shared motion layer for the Digit Finance homepage.
 * Version: 0.2.0
 * Requires PHP: 7.4
 * Author: Digit Finance
 * Text Domain: digit-finance-divi
 */

defined( 'ABSPATH' ) || exit;

defined( 'DFD_VERSION' ) || define( 'DFD_VERSION', '0.2.0' );
defined( 'DFD_FILE' ) || define( 'DFD_FILE', __FILE__ );
defined( 'DFD_DIR' ) || define( 'DFD_DIR', plugin_dir_path( __FILE__ ) );
defined( 'DFD_URL' ) || define( 'DFD_URL', plugin_dir_url( __FILE__ ) );

function dfd_prop( $props, $key, $default = '' ) {
	return isset( $props[ $key ] ) && '' !== $props[ $key ] ? $props[ $key ] : $default;
}

/**
 * Divi loads its module base class after plugins. Waiting for et_builder_ready
 * keeps activation safe on sites where Divi is not active yet.
 */
function dfd_register_divi_modules() {
	static $registered = false;
	if ( $registered ) {
		return;
	}
	if ( ! class_exists( 'ET_Builder_Module' ) ) {
		return;
	}

	require_once DFD_DIR . 'includes/class-dfd-hero.php';
	require_once DFD_DIR . 'includes/class-dfd-statement-metrics.php';

	if ( ! class_exists( 'DFD_Hero' ) ) {
		return;
	}
	new DFD_Hero();
	new DFD_Statement_Metrics();
	$registered = true;
}
add_action( 'et_builder_ready', 'dfd_register_divi_modules' );

/** Enqueue the homepage shell, motion layer and preloader only on the front page. */
function dfd_enqueue_home_assets() {
	if ( ! is_front_page() ) {
		return;
	}

	wp_enqueue_style(
		'dfd-fonts',
		'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400&family=Stack+Sans+Headline:wght@500;700&display=swap',
		array(),
		null
	);
	wp_enqueue_style(
		'dfd-home',
		DFD_URL . 'assets/home.css',
		array( 'dfd-fonts' ),
		DFD_VERSION
	);
	wp_enqueue_style(
		'dfd-preloader',
		DFD_URL . 'assets/preloader.css',
		array( 'dfd-home' ),
		DFD_VERSION
	);
	wp_enqueue_script(
		'dfd-home',
		DFD_URL . 'assets/home.js',
		array(),
		DFD_VERSION,
		true
	);
	wp_enqueue_script(
		'dfd-preloader',
		DFD_URL . 'assets/preloader.js',
		array( 'dfd-home' ),
		DFD_VERSION,
		true
	);
}
add_action( 'wp_enqueue_scripts', 'dfd_enqueue_home_assets' );

/** Set the preloader gate before the front page paints. */
function dfd_print_preloader_gate() {
	if ( ! is_front_page() ) {
		return;
	}
	?>
	<script>(function(){try{if(sessionStorage.getItem('dfd-preloaded')||matchMedia('(prefers-reduced-motion: reduce)').matches)return;document.documentElement.classList.add('dfd-preloading');sessionStorage.setItem('dfd-preloaded','1')}catch(e){}})();</script>
	<?php
}
add_action( 'wp_head', 'dfd_print_preloader_gate', 1 );

/** Render the homepage-only preloader before Divi's page markup. */
function dfd_render_preloader() {
	if ( ! is_front_page() ) {
		return;
	}
	$url = apply_filters( 'dfd_preloader_url', DFD_URL . 'assets/digit-preloader.webp' );
	printf(
		'<div id="dfd-preloader" aria-hidden="true"><img src="%1$s" alt="" width="832" height="464" decoding="async"></div>',
		esc_url( $url )
	);
}
add_action( 'wp_body_open', 'dfd_render_preloader' );

/**
 * Divi 5's module library reads module metadata from the registered extension
 * bundle. The small bridge is deliberately guarded so this plugin remains
 * harmless on Divi 4 and on non-Divi themes.
 */
function dfd_enqueue_divi5_bridge() {
	if ( ! function_exists( 'et_core_is_fb_enabled' ) || ! et_core_is_fb_enabled() || ! function_exists( 'et_builder_d5_enabled' ) || ! et_builder_d5_enabled() ) {
		return;
	}

	if ( class_exists( '\ET\\Builder\\VisualBuilder\\Assets\\PackageBuildManager' ) ) {
		\ET\Builder\VisualBuilder\Assets\PackageBuildManager::register_package_build(
			array(
				'name'    => 'digit-finance-divi-visual-builder',
				'version' => DFD_VERSION,
				'script'  => array(
					'src'                => DFD_URL . 'assets/divi5-modules.js',
					'deps'               => array( 'react', 'divi-module-library', 'divi-vendor-wp-hooks' ),
					'enqueue_top_window' => false,
					'enqueue_app_window' => true,
				),
			)
		);
	}
}
add_action( 'divi_visual_builder_assets_before_enqueue_scripts', 'dfd_enqueue_divi5_bridge' );
