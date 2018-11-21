const fs = require("fs");
const path = require("path");
const merge = require("webpack-merge");
const Analyzer = require("webpack-bundle-analyzer");
const root = fs.realpathSync(process.cwd());
const {
    appId,
    componentCode,
    name,
    version,
    projectType
} = require(path.resolve(root, "package.json"));
const library = name.replace(/@|\-|\//g, "_");
const buildProd =
    require("@talentui/webpack-config/src/helpers/parse-mode")() ===
    "production";

const webpackConfig = require("@talentui/webpack-config")({
    entry: {
        main: path.resolve(__dirname, "lib/index.js")
    },
    port: 3001,
    language: "mixed",
    extractStyles: false,
    publichPath: "//stnew03.beisen.com/ux/upaas/" + name + "/release/dist/",
    define: {
        "process.env": {
            library: JSON.stringify(library),
            packageName: JSON.stringify(name),
            appId: JSON.stringify(appId),
            componentCode: JSON.stringify(componentCode),
            projectType: JSON.stringify(projectType)
        }
    },
    projectType: "module"
});

module.exports = merge(webpackConfig, {
    externals: {
        react: "react",
        "react-dom": "reactDom"
    },
    output: {
        jsonpFunction: library
    },
    plugins: buildProd
        ? [
              new Analyzer.BundleAnalyzerPlugin({
                  analyzerMode: "static",
                  generateStatsFile: true,
                  reportFilename: `report-${version}.html`,
                  statsFilename: `stats-${version}.json`
              })
          ]
        : []
});
