# 外部组件打包配置

# ChangeLog


## 1.1.6

fix bug : add NODE_ENV to DefinePlugin to fix a Redux bug when build-prod
```
You are currently using minified code outside of NODE_ENV === 'production'. This means that you are running a slower development build of Redux. You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) to ensure you have the correct code for your production build.
```