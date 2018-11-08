
const path = require("path");
const merge = require("webpack-merge");
const Analyzer = require("webpack-bundle-analyzer");
const { appId, componentCode, name, version } = require("_/package.json");
const library = name.replace(/@|\-|\//g, "_");
const buildProd = require("@talentui/webpack-config/src/helpers/parse-mode")() === "production";

const webpackConfig = require("@talentui/webpack-config")({
  entry: {
    main: "./entry/index.js"
  },
  port: 3001,
  extractStyles: false,
//   alias: {
//     "&": path.resolve(__dirname, "src")
//   },
  define: {
    "process.env": {
      library: JSON.stringify(library),
      packageName: JSON.stringify(name),
      appId: JSON.stringify(appId),
      componentCode: JSON.stringify(componentCode)
    }
  },
  projectType: "module"
});

module.exports = merge(webpackConfig, {
  externals: {
    "react": "react",
    "react-dom":"reactDom"
  },
  output:{
    jsonpFunction: library
  },
  plugins: buildProd ?
    [
      new Analyzer.BundleAnalyzerPlugin({
        analyzerMode: "static",
        generateStatsFile: true,
        reportFilename: `report-${version}.html`,
        statsFilename: `stats-${version}.json`
      })
    ] :
    []
});
