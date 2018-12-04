import hoistNonReactStatics from 'hoist-non-react-statics';
import propsLoader from "./propsLoader";
import rawComponent from "_/src/index.js";
import ReactDom from "react-dom";
import React from "react";
const component = propsLoader(rawComponent);
const componentCode = process.env.componentCode; //组件 | 布局的编码
const appId = process.env.appId; //组件的应用ID

/**
 * 支持本地 localhost 调试
 */
if (process.env.NODE_ENV === "development") {
    const container = document.getElementById("italent-local-debug");
    if (container) {
        const Com = component;
        ReactDom.render(<Com />, container);
    }
}
/**
 * 组件注册
 */
if (process.env.projectType === "layout") {
    //如果是布局的话
    const layoutFunc = column => {
        class Layout extends React.Component {
            render() {
                const Com = component;
                return <Com {...this.props} column={column} />;//传递几等分的参数
            }
        }
        hoistNonReactStatics(Layout,component);//静态属性拷贝
        // Layout.onSave = component.onSave;// 页面保存前调用的钩子
        // Layout.getEditProps = component.getEditProps;
        return Layout;
    };
    window._talentui_registry.set("_layout", layoutFunc);
} else {
    //如果是组件的话
    window._talentui_registry.update("_externalComp", function(externalComp) {
        if (externalComp === undefined) {
            const newValue = {};
            newValue[appId] = {};
            newValue[appId][componentCode] = component;
            return newValue;
        } else {
            const curValue = externalComp[process.env.appId] || {};
            const newObj = {};
            newObj[componentCode] = component;
            externalComp[process.env.appId] = Object.assign(
                {},
                curValue,
                newObj
            );
            return externalComp;
        }
    });
}
