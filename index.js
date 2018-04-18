import components from "&/index.js";// 外部组件
import componentRegistry from "@talentui/external-component-registry";//组件注册工具，已注入到dll-react
/**
 * webpack 按需加载，设置public path
*/
__webpack_public_path__ = "//stnew03.beisen.com/ux/upaas/" + process.env.packageName + "/release/dist/";
/**
 * 组件注册
*/
componentRegistry.set(process.env.packageName, components);