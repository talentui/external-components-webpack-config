import "core-js/modules/es6.object.assign";
import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
var _jsxFileName = "/Users/beisen/Documents/project/@talentui/external-components-webpack-config/entry/index.js";

/**
 * 构建入口
 * webpack 按需加载，设置public path
 */
if (process.env.NODE_ENV === "development") {
  __webpack_public_path__ = "//localhost:3001/";
} else {
  __webpack_public_path__ = "//stnew03.beisen.com/ux/upaas/" + process.env.packageName + "/release/dist/";
}

import hoistNonReactStatics from 'hoist-non-react-statics';
import propsLoader from "./propsLoader";
import rawComponent from "_/src/index.js";
import ReactDom from "react-dom";
import React from "react";
var component = propsLoader(rawComponent);
var componentCode = process.env.componentCode; //组件 | 布局的编码

var appId = process.env.appId; //组件的应用ID

/**
 * 支持本地 localhost 调试
 */

if (process.env.NODE_ENV === "development") {
  var container = document.getElementById("italent-local-debug");

  if (container) {
    var Com = component;
    ReactDom.render(React.createElement(Com, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 29
      },
      __self: this
    }), container);
  }
}
/**
 * 组件注册
 */


if (process.env.projectType === "layout") {
  //如果是布局的话
  var layoutFunc = function layoutFunc(column) {
    var Layout =
    /*#__PURE__*/
    function (_React$Component) {
      _inheritsLoose(Layout, _React$Component);

      function Layout() {
        return _React$Component.apply(this, arguments) || this;
      }

      var _proto = Layout.prototype;

      _proto.render = function render() {
        var Com = component;
        return React.createElement(Com, _extends({}, this.props, {
          column: column,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 41
          },
          __self: this
        })); //传递几等分的参数
      };

      return Layout;
    }(React.Component);

    hoistNonReactStatics(Layout, component); //静态属性拷贝
    // Layout.onSave = component.onSave;// 页面保存前调用的钩子
    // Layout.getEditProps = component.getEditProps;

    return Layout;
  };

  window._talentui_registry.set("_layout", layoutFunc);
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