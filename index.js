/**
 * webpack 按需加载，设置public path
 */
__webpack_public_path__ =
    "//stnew03.beisen.com/ux/upaas/" +
    process.env.packageName +
    "/release/dist/";

import component from "&/index.js"; // 外部组件
import componentRegistry from "@talentui/external-component-registry"; //组件注册工具，已注入到dll-react
/**
 * 组件注册
 */
const componentCode = process.env.componentCode;
const appId = process.env.appId;
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
        externalComp[process.env.appId] = Object.assign({}, curValue, newObj);
        return externalComp;
    }
});
componentRegistry.set(process.env.componentCode, component);