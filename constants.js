const { NODE_ENV, npm_package_name, npm_package_appId } = process.env;
const production = "production"
const library = npm_package_name.replace(/@|\-|\//g,'_');//以package name作为umd全局的变量名
const rawName = npm_package_name;//项目名称
const appId = npm_package_appId;
const isProduction = NODE_ENV === production;
module.exports = {
    isProduction,
    library,
    rawName,
    appId
};
