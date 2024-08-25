const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    '@components': path.resolve(__dirname, 'src/js/components'),
    "@utils": path.resolve(__dirname, './src/js/utilities'),
    "@store": path.resolve(__dirname, './src/js/store'),
    "@api": path.resolve(__dirname, './src/js/API'),
    "@config": path.resolve(__dirname, './src/js/config'),
  })
);
