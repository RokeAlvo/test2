/* global module */

let config = {
  'notGetBlocks': [
    'blocks-demo.html',
  ],
  'ignoredBlocks': [
    'no-js',
  ],
  'alwaysAddBlocks': [
    // 'sprite-svg',
    // 'sprite-png',
    // 'object-fit-polyfill',
  ],
  'addStyleBefore': [
    'src/scss/variables.scss',
    'src/scss/mixins.scss',
    'src/scss/fonts.scss',
    // 'somePackage/dist/somePackage.css', // для 'node_modules/somePackage/dist/somePackage.css',
  ],
  'addStyleAfter': [
    // 'src/scss/print.scss',
  ],
  'addJsBefore': [
    // 'somePackage/dist/somePackage.js', // для 'node_modules/somePackage/dist/somePackage.js',
    'jquery/dist/jquery.min.js'
  ],
  'addJsAfter': [
    './script.js',
  ],
  'addAssets': {
    'src/fonts/demo-empty-open-sans.woff2': 'fonts/',
    'src/fonts/Montserrat-Regular.woff': 'fonts/',
    'src/fonts/Montserrat-Regular.ttf': 'fonts/',
    'src/fonts/Montserrat-Bold.woff': 'fonts/',
    'src/fonts/Montserrat-Bold.ttf': 'fonts/',
    'src/fonts/Montserrat-Black.otf': 'fonts/',
    'src/fonts/Montserrat-Black.otf': 'fonts/',
    'src/fonts/MontserratAlternates-Medium.otf': 'fonts/',
    'src/fonts/MaterialIcons-Regular.woff2': 'fonts/',
    'src/img/favicon.png': 'img/',

    'src/img/demo-*.{png,svg,jpg,jpeg}': 'img/',
    'src/favicon/*.{png,ico,svg,xml,webmanifest}': 'img/favicon',
    // 'node_modules/somePackage/images/*.{png,svg,jpg,jpeg}': 'img/',
  },
  'dir': {
    'src': 'src/',
    'build': 'build/',
    'blocks': 'src/blocks/'
  },
  'bemModSeparator': '_',
  'defaultExtensions': ['scss'],
};

module.exports = config;
