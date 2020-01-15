const {
  override,
  addDecoratorsLegacy,
  fixBabelImports,
} = require('customize-cra');

module.exports = override(
  addDecoratorsLegacy(),
  fixBabelImports('react-app-rewire-mobx', {
    libraryDirectory: '',
    camel2DashComponentName: false,
  }),
);
