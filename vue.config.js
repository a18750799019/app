const path = require('path')
const webpack = require('webpack')

module.exports = {
  // baseUrl: "./",
  publicPath: "./",
  outputDir: 'dist',
  assetsDir: 'assets',
  indexPath: 'index.html',
  lintOnSave: false,
  css:{
    // extract:{
    //   publicPath: "../../"
    // }
  },
  chainWebpack: config => {
    config.plugins.delete("prefetch")
    config.plugins.delete('prefetch-index')
    config.resolve.alias
      .set('@', path.join(__dirname, 'src'))
      .set('$public', path.join(__dirname, 'public'))

    config.externals({
      'vue': 'Vue',
      'vuex': 'Vuex',
      'vue-router': 'VueRouter',
      // 'axios': 'axios',
      'moment': 'moment'
    })
  },
  configureWebpack: {
    performance: {
      hints:'warning',
      //入口起点的最大体积
      maxEntrypointSize: 50000000,
      //生成文件的最大体积
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith('.js');
      }
    }
  },
  productionSourceMap: false,
  devServer: {
       // 设置主机地址
       host: '0.0.0.0',
       // 设置默认端口
       port: 3000,

    proxy: {
        '/webapi': {
          target: 'www.baidu.com/webapi',
          ws: false,
          changeOrigin:true,//允许跨域
          pathRewrite:{
           '^/webapi':''
          }
        },
        "/geoserver": {
          target: "http://192.168.1.200:39080",
          ws: false,
          changeOrigin:true,//允许跨域
        },
        "/api": {
          target: "http://192.168.1.234:18080",
          // target: "http://192.168.200.132:8015",
          ws: false,
          changeOrigin:true,//允许跨域
        }
      }
  }
}


//## http://www.coder55.com/article/66953