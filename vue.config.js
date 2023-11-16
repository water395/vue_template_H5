'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = '跳转小程序' // page title


module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    open: false,
    hot: false,
    // hotOnly: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        // target: 'https://test.freshfans.cn',   //测试环境
        //target: 'http://gateway.freshfans.cn:7979', //开发环境
        target: 'http://192.168.2.131:8021',
        //target: 'http://xffdevapi.freshfans.cn',
        // target: 'http://fsatestdapi.freshfans.cn',
        // target: 'https://pms-api.freshfans.cn',
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
  },
  configureWebpack: {
    // 注入标题
    name: name,
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 200000
      }
    },
    resolve: {
      alias: {
        '@': resolve('src')
        //'@m': resolve('mobile')
      }
    }
  },
  chainWebpack(config) {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')


    // set preserveWhitespace
    // config.module
    //   .rule('vue')
    //   .use('vue-loader')
    //   .loader('vue-loader')
    //   .tap(options => {
    //     options.compilerOptions.preserveWhitespace = true
    //     return options
    //   })
    //   .end()

  }
}
