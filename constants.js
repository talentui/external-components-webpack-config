const {
    NODE_ENV,
    // npm_package_name,
    // npm_package_appId,
    // npm_package_componentCode,
    entry
} = process.env;
const path = require("path");
const root = process.cwd();
const pjson = require(path.resolve(root, entry ? entry : '', "package.json"));
const packageName = pjson.name; //项目名称
const version = require(path.resolve(root, "package.json")).version;//root项目的version为准
const appId = pjson.appId;
const componentCode = pjson.componentCode;//组件编码
const production = "production";
const library = packageName.replace(/@|\-|\//g, "_"); //以package name作为umd全局的变量名
const isProduction = NODE_ENV === production;
const dllList = pjson.dllList;
const componentEntry = entry
    ? path.resolve(root, entry, "src/index.js")
    : "&/index.js";
module.exports = {
    isProduction,
    library,
    packageName,
    appId,
    root,
    componentCode,
    dllList,
    componentEntry,
    version
};