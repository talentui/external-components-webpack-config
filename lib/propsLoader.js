import "core-js/modules/es6.promise";
//按需挂载属性设置，这样运行态就不用加载属性组件
export default (function (Target) {
  Target.getEditProps = function () {
    return new Promise(function (resolve) {
      import('_/src/props/index.js').then(function (props) {
        resolve(props.default);
      });
    });
  };

  return Target;
});