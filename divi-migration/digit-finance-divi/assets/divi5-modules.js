(function () {
  'use strict';

  /*
   * This file is loaded only inside the Divi 5 Visual Builder app window.
   * Divi exposes WordPress hooks through vendor.wp.hooks in that window; the
   * guards keep the package inert if a different builder or an older Divi
   * version is present.
   */
  var divi = window.divi;
  var hooks = window.vendor && window.vendor.wp && window.vendor.wp.hooks;
  if (!divi || !divi.moduleLibrary || !divi.moduleLibrary.registerModule || !hooks || !hooks.addAction) return;

  var text = function (selector, tagName, defaultValue, elementType) {
    return {
      type: 'object',
      selector: '{{selector}} ' + selector,
      tagName: tagName || 'div',
      inlineEditor: 'plainText',
      elementType: elementType || 'text',
      childrenSanitizer: 'et_core_esc_previously',
      default: { innerContent: { desktop: { value: defaultValue || '' } } },
      settings: {
        innerContent: {
          groupType: 'group-item',
          item: {
            groupName: 'mainContent',
            priority: 10,
            render: true,
            label: 'Content',
            description: 'Edit this content.',
            features: { dynamicContent: false },
            component: { name: 'divi/text', type: 'field' },
          },
        },
      },
    };
  };

  var image = {
    type: 'object', selector: '{{selector}} .hero-portrait img', elementType: 'imageLink', supportsCustomAttributes: true,
    settings: { innerContent: { groupType: 'group-items', items: { src: { groupSlug: 'heroImage', attrName: 'image.innerContent', subName: 'src', priority: 10, render: true, label: 'Hero image', component: { name: 'divi/upload', type: 'field', props: { syncImageData: { src: true, id: true, alt: true, titleText: true } } } } } } },
  };

  var metadata = [
    {
      name: 'digit-finance/hero', d4Shortcode: 'dfd_hero', title: 'Digit Hero', titles: 'Digit Heroes',
      moduleClassName: 'dfd-hero', moduleOrderClassName: 'dfd-hero', category: 'module',
      attributes: {
        module: { type: 'object', selector: '{{selector}}' },
        eyebrow: text('.hero-meta span', 'span', 'Financial advisory and fractional CFO support'),
        supportingText: text('.hero-meta p', 'p', 'AI-powered speed and board-level judgment for founders raising Seed to Series B.'),
        heading: text('.hero-title', 'h1', 'Numbers that get you', 'heading'),
        accent: text('.hero-title em', 'em', 'funded'),
        image: image,
        panelIndex: text('.hero-panel-index', 'span', '01 / The Founder Problem'),
        quote: text('.hero-panel blockquote', 'blockquote', "Startup founders are brilliant at building their product, but when the numbers don't hold up, the cash flow, the model, the story investors need to hear, the best ideas in the world don't get funded."),
        panelLabel: text('.hero-panel-footer span:first-child', 'span', 'Fractional CFO'),
        panelLocation: text('.hero-panel-footer span:last-child', 'span', 'US · UK · EU'),
      },
      settings: { content: 'auto', design: 'auto', advanced: 'auto' },
    },
    {
      name: 'digit-finance/statement-metrics', d4Shortcode: 'dfd_statement_metrics', title: 'Statement & Metrics', titles: 'Statements & Metrics',
      moduleClassName: 'dfd-statement-metrics', moduleOrderClassName: 'dfd-statement-metrics', category: 'module',
      attributes: {
        module: { type: 'object', selector: '{{selector}}' },
        label: text('.section-label', 'div', 'The Partnership'),
        statement: text('.statement-copy', 'p', 'We pair AI-powered speed with board-level judgment to turn fast-moving startups into investor-ready businesses'),
        metric1Value: text('.metric:nth-child(1) strong', 'strong', '€250M+'), metric1Label: text('.metric:nth-child(1) span', 'span', 'Capital raised by supported founders'),
        metric2Value: text('.metric:nth-child(2) strong', 'strong', '100+'), metric2Label: text('.metric:nth-child(2) span', 'span', 'Startups supported from pre-seed to scale-up'),
        metric3Value: text('.metric:nth-child(3) strong', 'strong', '14 yrs'), metric3Label: text('.metric:nth-child(3) span', 'span', 'Senior corporate finance experience'),
      },
      settings: { content: 'auto', design: 'auto', advanced: 'auto' },
    },
  ];

  function registerAll() {
    metadata.forEach(function (item) {
      try {
        divi.moduleLibrary.registerModule(item, {
          renderers: { edit: null },
          placeholderContent: { module: { decoration: { background: { desktop: { value: { color: '#07004d' } } } } } },
        });
      } catch (error) {
        if (window.console && console.warn) console.warn('Digit Finance module registration failed.', error);
      }
    });
  }

  hooks.addAction('divi.moduleLibrary.registerModuleLibraryStore.after', 'digitFinance.registerModules', registerAll);
}());
