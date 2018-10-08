
# 外部组件打包配置

# 4.0.1-beta
打包工具和`@talentui/webpack-config`整合，内部绝大部分的配置都是从`@talentui/webpack-config`引入的。

# 1.3.0-beta
添加编译路径的支持,通过环境变量entry指定组件的入口

# 1.1.0-beta
从package.json中读取dllList参数，不从dll-config中读了

# 1.0.5-beta
修改output的library为 jsonpFunction

# 1.0.3-beta
添加plugin ： webpack-bundle-analyzer， 为构建结果生成可视化的构建报告，生成html文件和json文件，协助组件完成构建优化分析。

# 1.0.2-beta

给output添加library参数，方式多webpack runtime instance 的情况下，导致的chunk加载问题
