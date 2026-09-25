<?php
/**
 * Digit Finance theme bootstrap.
 *
 * @package DigitFinance
 */

defined( 'ABSPATH' ) || exit;

add_action(
	'after_setup_theme',
	static function (): void {
		add_theme_support( 'wp-block-styles' );
		add_theme_support( 'responsive-embeds' );
		add_theme_support( 'editor-styles' );
		add_editor_style(
			array(
				'assets/css/base.css',
				'assets/css/navigation.css',
				'assets/css/homepage.css',
			)
		);
	}
);

add_action(
	'enqueue_block_editor_assets',
	static function (): void {
		wp_enqueue_style(
			'digit-finance-editor-fonts',
			'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500&family=Stack+Sans+Headline:wght@500;700&display=swap',
			array(),
			null
		);
	}
);

add_action(
	'init',
	static function (): void {
		register_block_pattern_category(
			'digit-finance',
			array(
				'label'       => __( 'Digit Finance', 'digit-finance' ),
				'description' => __( 'Editable sections for the Digit Finance website.', 'digit-finance' ),
			)
		);
	}
);

add_action(
	'wp_enqueue_scripts',
	static function (): void {
		$version = wp_get_theme()->get( 'Version' ) ?: '0.1.0';

		wp_enqueue_style(
			'digit-finance-fonts',
			'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500&family=Stack+Sans+Headline:wght@500;700&display=swap',
			array(),
			null
		);
		wp_enqueue_style( 'digit-finance-base', get_theme_file_uri( 'assets/css/base.css' ), array( 'digit-finance-fonts' ), $version );
		wp_enqueue_style( 'digit-finance-navigation', get_theme_file_uri( 'assets/css/navigation.css' ), array( 'digit-finance-base' ), $version );

		if ( is_front_page() ) {
			wp_enqueue_style( 'digit-finance-homepage', get_theme_file_uri( 'assets/css/homepage.css' ), array( 'digit-finance-base' ), $version );
			wp_enqueue_style( 'digit-finance-preloader', get_theme_file_uri( 'assets/css/preloader.css' ), array(), $version );
			wp_enqueue_script( 'digit-finance-preloader', get_theme_file_uri( 'assets/js/preloader.js' ), array(), $version, false );
			wp_enqueue_script( 'digit-finance-homepage-motion', get_theme_file_uri( 'assets/js/homepage-motion.js' ), array(), $version, true );
		}
	}
);

add_filter(
	'wp_resource_hints',
	static function ( array $urls, string $relation_type ): array {
		if ( 'preconnect' === $relation_type ) {
			$urls[] = array(
				'href'        => 'https://fonts.gstatic.com',
				'crossorigin' => 'anonymous',
			);
		}

		return $urls;
	},
	10,
	2
);

add_action(
	'wp_body_open',
	static function (): void {
		if ( ! is_front_page() ) {
			return;
		}
		?>
		<div class="df-preloader" aria-hidden="true">
			<img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/digit-preloader.webp' ) ); ?>" alt="" width="832" height="464" decoding="async">
		</div>
		<?php
	}
);
