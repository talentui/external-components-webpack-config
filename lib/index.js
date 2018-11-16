import "core-js/modules/es6.object.assign";

/**
 * 构建入口
 * webpack 按需加载，设置public path
 */
__webpack_public_path__ = "//stnew03.beisen.com/ux/upaas/" + process.env.packageName + "/release/dist/";
import propsLoader from "./propsLoader";
import rawComponent from "_/src/index.js";
var component = propsLoader(rawComponent);
/**
 * 组件注册
 */

var componentCode = process.env.componentCode; //组件 | 布局的编码

var appId = process.env.appId; //组件的应用ID

if (process.env.projectType === "layout") {
  //如果是布局的话
  window._talentui_registry.set("_layout", component);
} else {
  //如果是组件的话
  window._talentui_registry.update("_externalComp", function (externalComp) {
    if (externalComp === undefined) {
      var newValue = {};
      newValue[appId] = {};
      newValue[appId][componentCode] = component;
      return newValue;
    } else {
      var curValue = externalComp[process.env.appId] || {};
      var newObj = {};
      newObj[componentCode] = component;
      externalComp[process.env.appId] = Object.assign({}, curValue, newObj);
      return externalComp;
    }
  });
}