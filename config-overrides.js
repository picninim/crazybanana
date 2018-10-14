const {
  override,
  addDecoratorsLegacy,
  disableEsLint,
  addBundleVisualizer,
  addWebpackAlias
} = require("customize-cra");
const path = require("path");

module.exports = override(
  addDecoratorsLegacy(),
  disableEsLint(),
  // eslint-disable-next-line
  process.env.BUNDLE_VISUALIZE == 1 && addBundleVisualizer(),
  addWebpackAlias({
    // eslint-disable-next-line
    ["ag-grid-react$"]: path.resolve(__dirname, "src/shared/agGridWrapper.js")
  })
);
