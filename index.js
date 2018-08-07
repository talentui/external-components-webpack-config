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
window._talentui_registry.update("_externalComp", function(externalComp) {
    if (externalComp === undefined) {
        return {
            [process.env.appId]: {
                [process.env.componentCode]: component
            }
        };
    } else {
        const curList = externalComp[process.env.appId] || {};
        externalComp[process.env.appId] = Object.assign({}, curList, {
            [process.env.componentCode]: component
        });
        return externalComp;
    }
});
componentRegistry.set(process.env.componentCode, component);
