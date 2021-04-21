module.exports ={

    devServer:{
        port:80, // 启动端口
        open:true  // 启动后是否自动打开网页
    },

    // chainWebpack: config => {
    //     发布模式
    //     config.when(process.env.NODE_ENV === 'production', config => {
    //         config.entry('app').clear().add('./src/main-prod.js')
    //         //externals外部加载资源
    //         config.set('externals', {
    //             'Vue': 'Vue',
    //             'VueRouter': 'VueRouter'
    //             // 'element-ui': 'ELEMENT',
    //         })
    //         config.plugin('html').tap(args => {
    //             args[0].isProd = true
    //             return args
    //         })
    //
    //     });
    //     开发模式
    //     config.when(process.env.NODE_ENV === 'development', config => {
    //         config.entry('app').clear().add('./src/main-dev.js')
    //         config.plugin('html').tap(args => {
    //             args[0].isProd = false
    //             return args
    //         })
    //     });
    // }

}
