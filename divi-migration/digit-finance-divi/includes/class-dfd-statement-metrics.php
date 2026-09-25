<?php
defined( 'ABSPATH' ) || exit;

class DFD_Statement_Metrics extends ET_Builder_Module {
	public $slug       = 'dfd_statement_metrics';
	public $vb_support = 'partial';

	public function init() {
		$this->name = esc_html__( 'Statement & Metrics', 'digit-finance-divi' );
		$this->main_css_element = '%%order_class%%.dfd-statement-metrics';
	}

	public function get_fields() {
		$fields = array(
			'label' => array( 'label' => esc_html__( 'Section label', 'digit-finance-divi' ), 'type' => 'text', 'default' => 'The Partnership', 'toggle_slug' => 'content' ),
			'statement' => array( 'label' => esc_html__( 'Statement', 'digit-finance-divi' ), 'type' => 'textarea', 'default' => 'We pair AI-powered speed with board-level judgment to turn fast-moving startups into investor-ready businesses', 'toggle_slug' => 'content' ),
			'anchor_id' => array( 'label' => esc_html__( 'Section anchor ID', 'digit-finance-divi' ), 'type' => 'text', 'default' => 'approach', 'toggle_slug' => 'advanced' ),
		);
		for ( $index = 1; $index <= 3; $index++ ) {
			$fields[ "metric_{$index}_value" ] = array( 'label' => sprintf( esc_html__( 'Metric %d value', 'digit-finance-divi' ), $index ), 'type' => 'text', 'default' => array( 1 => '€250M+', 2 => '100+', 3 => '14 yrs' )[ $index ], 'toggle_slug' => 'metrics' );
			$fields[ "metric_{$index}_count" ] = array( 'label' => sprintf( esc_html__( 'Metric %d count target', 'digit-finance-divi' ), $index ), 'type' => 'text', 'default' => array( 1 => '250', 2 => '100', 3 => '14' )[ $index ], 'toggle_slug' => 'metrics' );
			$fields[ "metric_{$index}_prefix" ] = array( 'label' => sprintf( esc_html__( 'Metric %d prefix', 'digit-finance-divi' ), $index ), 'type' => 'text', 'default' => array( 1 => '€', 2 => '', 3 => '' )[ $index ], 'toggle_slug' => 'metrics' );
			$fields[ "metric_{$index}_suffix" ] = array( 'label' => sprintf( esc_html__( 'Metric %d suffix', 'digit-finance-divi' ), $index ), 'type' => 'text', 'default' => array( 1 => 'M+', 2 => '+', 3 => ' yrs' )[ $index ], 'toggle_slug' => 'metrics' );
			$fields[ "metric_{$index}_label" ] = array( 'label' => sprintf( esc_html__( 'Metric %d description', 'digit-finance-divi' ), $index ), 'type' => 'text', 'default' => array( 1 => 'Capital raised by supported founders', 2 => 'Startups supported from pre-seed to scale-up', 3 => 'Senior corporate finance experience' )[ $index ], 'toggle_slug' => 'metrics' );
		}
		return $fields;
	}

	public function render( $attrs, $content = null, $render_slug ) {
		$out = sprintf( '<section class="dfd-statement-metrics statement" id="%1$s"><div class="shell"><div class="section-label">%2$s</div><p class="statement-copy" data-scroll-reveal>%3$s</p><div class="metrics" data-reveal>', esc_attr( sanitize_html_class( dfd_prop( $this->props, 'anchor_id', 'approach' ) ) ), esc_html( dfd_prop( $this->props, 'label' ) ), esc_html( dfd_prop( $this->props, 'statement' ) ) );
		for ( $index = 1; $index <= 3; $index++ ) {
			$out .= sprintf( '<div class="metric"><strong data-count="%s" data-prefix="%s" data-suffix="%s">%s</strong><span>%s</span></div>', esc_attr( dfd_prop( $this->props, "metric_{$index}_count" ) ), esc_attr( dfd_prop( $this->props, "metric_{$index}_prefix" ) ), esc_attr( dfd_prop( $this->props, "metric_{$index}_suffix" ) ), esc_html( dfd_prop( $this->props, "metric_{$index}_value" ) ), esc_html( dfd_prop( $this->props, "metric_{$index}_label" ) ) );
		}
		return $out . '</div></div></section>';
	}
}
