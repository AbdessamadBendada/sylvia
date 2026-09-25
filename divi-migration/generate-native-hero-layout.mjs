import fs from 'node:fs';

const target = 'divi-migration/AI Test Homepage - Hero.json';
const desktop = (value) => ({ desktop: { value } });
const module = (name, attributes, inner = '') =>
  `<!-- wp:divi/${name} ${JSON.stringify(attributes)}${inner ? ' -->\r\n' + inner + `\r\n<!-- /wp:divi/${name} -->` : ' /-->'}`;

const base = (value = {}) => ({ module: { decoration: { layout: desktop({ display: 'block' }) }, ...value }, builderVersion: '5.12.1', modulePreset: ['default'] });
const attrs = (className) => className ? { decoration: { attributes: desktop({ attributes: [{ id: `dfd-${className}`, name: 'class', value: className, adminLabel: 'CSS Class', targetElement: '' }] }) } } : {};
const text = (html, className = '') => module('text', {
  ...base(attrs(className)),
  content: { innerContent: desktop(html) },
});
const heading = (content, className = '') => module('heading', {
  ...base(attrs(className)),
  title: { innerContent: desktop(content) },
});
const image = (src, alt, className = '') => module('image', {
  ...base(attrs(className)),
  image: { innerContent: desktop({ src, alt }) },
});

const hero = [
  module('section', { ...base({ meta: { adminLabel: desktop('Digit Finance Hero') }, ...attrs('dfd-hero-section') }) }, [
    module('row', { ...base({ ...attrs('dfd-shell') }) }, [
      module('column', { ...base({ advanced: { type: desktop('4_4') }, ...attrs('dfd-hero-copy-column') }) }, [
        module('group', { ...base(attrs('dfd-hero-copy')) }, [
          text('<p>Financial advisory and fractional CFO support</p>', 'dfd-hero-eyebrow'),
          text('<p>AI-powered speed and board-level judgment for founders raising Seed to Series B.</p>', 'dfd-hero-supporting'),
          heading('Numbers that get you <span>funded</span>', 'dfd-hero-title'),
        ].join('\r\n')),
      ].join('\r\n')),
    ].join('\r\n')),
    module('row', { ...base({ advanced: { columnStructure: desktop('1_2,1_2') }, ...attrs('dfd-hero-stage') }) }, [
      module('column', { ...base({ advanced: { type: desktop('1_2') }, ...attrs('dfd-hero-image-column') }) }, [
        image('REPLACE_WITH_MEDIA_LIBRARY_URL', 'Sylvia Cebanu, founder of Digit Finance', 'dfd-hero-image'),
      ].join('\r\n')),
      module('column', { ...base({ advanced: { type: desktop('1_2') }, ...attrs('dfd-hero-panel-column') }) }, [
        module('group', { ...base(attrs('dfd-hero-panel')) }, [
          text('<p>01 / The Founder Problem</p>', 'dfd-hero-index'),
          text('<p>Startup founders are brilliant at building their product, but when the numbers don\'t hold up, the cash flow, the model, the story investors need to hear, the best ideas in the world <span>don\'t get funded.</span></p>', 'dfd-hero-quote'),
          text('<p>Fractional CFO <span>US · UK · EU</span></p>', 'dfd-hero-footer'),
        ].join('\r\n')),
      ].join('\r\n')),
    ].join('\r\n')),
  ].join('\r\n')),
].join('\r\n');

const output = { context: 'et_builder', data: { '23': `<!-- wp:divi/placeholder -->${hero}<!-- /wp:divi/placeholder -->` }, presets: null, global_colors: [], global_variables: [], page_settings_meta: null, canvases: { local: [], global: [] }, images: [], thumbnails: [] };
fs.writeFileSync(target, `${JSON.stringify(output, null, 2)}\n`);
