
# 外部组件打包配置

# 1.1.0-beta
从package.json中读取dllList参数，不从dll-config中读了

# 1.0.5-beta
修改output的library为 jsonpFunction

# 1.0.3-beta
添加plugin ： webpack-bundle-analyzer， 为构建结果生成可视化的构建报告，生成html文件和json文件，协助组件完成构建优化分析。

# 1.0.2-beta

给output添加library参数，方式多webpack runtime instance 的情况下，导致的chunk加载问题
