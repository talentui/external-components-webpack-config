const fileRule = require('@talentui/webpack-config/src/rules/file-rule');
const jsRule = require('@talentui/webpack-config/src/rules/js-rule');
const cssRule = require('@talentui/webpack-config/src/rules/css-rule');
const sassRule = require('@talentui/webpack-config/src/rules/sass-rule');
const tsRule = require('@talentui/webpack-config/src/rules/ts-rule');
//支持移动端的less
const lessRule = {
    test: /\.less$/,
    use: ['css-loader', 'less-loader']
};
module.exports = [fileRule, jsRule, cssRule, sassRule, tsRule, lessRule]