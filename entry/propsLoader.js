//按需挂载属性设置，这样运行态就不用加载属性组件
export default Target => {
    Target.getEditProps = function(){
        return new Promise(resolve =>{
            import('&/props/index.js').then(props =>{
                resolve(props.default);
            })
        })
    }
    return Target;
};