<?php
defined( 'ABSPATH' ) || exit;

class DFD_Hero extends ET_Builder_Module {
	public $slug       = 'dfd_hero';
	public $vb_support = 'partial';

	public function init() {
		$this->name = esc_html__( 'Digit Hero', 'digit-finance-divi' );
		$this->main_css_element = '%%order_class%%.dfd-hero';
	}

	public function get_fields() {
		return array(
			'eyebrow' => array( 'label' => esc_html__( 'Eyebrow', 'digit-finance-divi' ), 'type' => 'text', 'default' => 'Financial advisory and fractional CFO support', 'toggle_slug' => 'content' ),
			'supporting_text' => array( 'label' => esc_html__( 'Supporting text', 'digit-finance-divi' ), 'type' => 'textarea', 'default' => 'AI-powered speed and board-level judgment for founders raising Seed to Series B.', 'toggle_slug' => 'content' ),
			'heading' => array( 'label' => esc_html__( 'Heading', 'digit-finance-divi' ), 'type' => 'text', 'default' => 'Numbers that get you', 'toggle_slug' => 'content' ),
			'accent' => array( 'label' => esc_html__( 'Accent word', 'digit-finance-divi' ), 'type' => 'text', 'default' => 'funded', 'toggle_slug' => 'content' ),
			'image' => array( 'label' => esc_html__( 'Hero image URL', 'digit-finance-divi' ), 'type' => 'upload', 'upload_button_text' => esc_html__( 'Choose image', 'digit-finance-divi' ), 'toggle_slug' => 'content' ),
			'image_alt' => array( 'label' => esc_html__( 'Image alt text', 'digit-finance-divi' ), 'type' => 'text', 'default' => 'Sylvia Cebanu, founder of Digit Finance', 'toggle_slug' => 'content' ),
			'panel_index' => array( 'label' => esc_html__( 'Panel index', 'digit-finance-divi' ), 'type' => 'text', 'default' => '01 / The Founder Problem', 'toggle_slug' => 'content' ),
			'quote' => array( 'label' => esc_html__( 'Founder problem quote', 'digit-finance-divi' ), 'type' => 'textarea', 'default' => "Startup founders are brilliant at building their product, but when the numbers don't hold up, the cash flow, the model, the story investors need to hear, the best ideas in the world don't get funded.", 'toggle_slug' => 'content' ),
			'panel_label' => array( 'label' => esc_html__( 'Panel footer label', 'digit-finance-divi' ), 'type' => 'text', 'default' => 'Fractional CFO', 'toggle_slug' => 'content' ),
			'panel_location' => array( 'label' => esc_html__( 'Panel footer location', 'digit-finance-divi' ), 'type' => 'text', 'default' => 'US · UK · EU', 'toggle_slug' => 'content' ),
			'anchor_id' => array( 'label' => esc_html__( 'Section anchor ID', 'digit-finance-divi' ), 'type' => 'text', 'default' => 'hero', 'toggle_slug' => 'advanced' ),
		);
	}

	public function render( $attrs, $content = null, $render_slug ) {
		$image = dfd_prop( $this->props, 'image' );
		return sprintf(
			'<section id="%1$s" class="dfd-hero hero shell" data-dfd-module="hero"><div class="hero-meta"><span>%2$s</span><p>%3$s</p></div><h1 class="hero-title"><span class="line"><span class="word">%4$s <em>%5$s</em></span></span></h1><div class="hero-stage" data-observe><div class="hero-portrait">%6$s</div><div class="hero-panel"><span class="hero-panel-index">%7$s</span><blockquote data-word-reveal>%8$s</blockquote><div class="hero-panel-footer"><span>%9$s</span><span>%10$s</span></div></div></div></section>',
			esc_attr( sanitize_html_class( dfd_prop( $this->props, 'anchor_id', 'hero' ) ) ), esc_html( dfd_prop( $this->props, 'eyebrow', 'Financial advisory and fractional CFO support' ) ), esc_html( dfd_prop( $this->props, 'supporting_text' ) ), esc_html( dfd_prop( $this->props, 'heading', 'Numbers that get you' ) ), esc_html( dfd_prop( $this->props, 'accent', 'funded' ) ),
			$image ? sprintf( '<img src="%s" alt="%s" decoding="async">', esc_url( $image ), esc_attr( dfd_prop( $this->props, 'image_alt' ) ) ) : '',
			esc_html( dfd_prop( $this->props, 'panel_index' ) ), esc_html( dfd_prop( $this->props, 'quote' ) ), esc_html( dfd_prop( $this->props, 'panel_label' ) ), esc_html( dfd_prop( $this->props, 'panel_location' ) )
		);
	}
}
