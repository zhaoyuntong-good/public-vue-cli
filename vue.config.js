const webpack = require('webpack')
const path = require('path')
module.exports = {
  //部署应用包时的基本 URL
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  //当运行 vue-cli-service build 时生成的生产环境构建文件的目录
  outputDir: 'dist',
  //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: 'assets',
  // eslint-loader 是否在保存的时候检查 安装@vue/cli-plugin-eslint有效
  lintOnSave: true,
  //是否使用包含运行时编译器的 Vue 构建版本。设置true后你就可以在使用template
  runtimeCompiler: true,
  // 生产环境是否生成 sourceMap 文件 
  productionSourceMap: false,
  chainWebpack: config => {
    // 移除prefetch插件
    // 因为不移除的话会默认开启 prefetch(预先加载模块)，提前获取用户未来可能会访问的内容在首屏会把这十几个路由文件，都一口气下载了
    config.plugins.delete('prefetch');
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
        // 为生产环境修改配置...
    } else {
        // 为开发环境修改配置...
    }
  },
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin 生产环境下是true,开发环境下是false
    extract: false,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    // modules: true
  },
  // webpack-dev-server 相关配置
  devServer: { // 设置代理
    hot: true, //热加载
    host: '0.0.0.0', //ip地址
    port: 8081, //端口
    https: false, //false关闭https，true为开启
    open: true, //自动打开浏览器
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '/rcs':{
        target: 'http://10.50.7.122:8083', // 李玉杰
        changeOrigin: true,
        pathRewrite: {
          '^/rcs': '/rcs'
        }
      },
    }
  },
  pluginOptions: { // 第三方插件配置
  }
}