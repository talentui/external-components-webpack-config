const {
    NODE_ENV,
    npm_package_name,
    npm_package_appId,
    npm_package_componentCode,
    entry
} = process.env;
const path = require('path');
const production = "production";
const library = npm_package_name.replace(/@|\-|\//g, "_"); //以package name作为umd全局的变量名
const packageName = npm_package_name; //项目名称
const appId = npm_package_appId;
const componentCode = npm_package_componentCode; //组件编码
const isProduction = NODE_ENV === production;
const root = process.cwd();
const dllList = require(path.resolve(root,'package.json')).dllList;
const componentEntry = entry ? path.resolve(root, entry) : '&/index.js'
module.exports = {
    isProduction,
    library,
    packageName,
    appId,
    root,
    componentCode,
    dllList,
    componentEntry
};