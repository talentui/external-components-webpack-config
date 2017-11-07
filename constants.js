const { NODE_ENV, npm_package_name } = process.env;
const production = "production"
const library = npm_package_name.replace(/@|\-|\//g,'_');//以package name作为umd全局的变量名

const isProduction = NODE_ENV === production;
module.exports = {
    isProduction,
    library
};
