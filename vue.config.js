const path = require("path");

module.exports = {
  // 基本路径
  publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
  // 输出文件目录
  outputDir: "dist",
// eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  //用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: "assets",

//是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建，在适当的时候开启几个子进程去并发的执行压缩
  parallel: require('os').cpus().length > 1,

  // 第三方插件配置
  pluginOptions: {
    // ...
  },
  pwa: {},
  productionSourceMap: false,

  // 配置webpack config
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = "production";
    } else {
      // 为开发环境修改配置...
      config.mode = "development";
    }

    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        extensions: [".js", ".vue", ".json", ".ts", ".tsx"],
        alias: {
          vue$: "vue/dist/vue.js",
          "@": path.resolve(__dirname, "./src"),
          "@c": path.resolve(__dirname, "./src/components"),
          assets: path.resolve(__dirname, "./src/assets"),
          common: path.resolve(__dirname, "./src/common"),
          components: path.resolve(__dirname, "./src/components"),
          network: path.resolve(__dirname, "./src/network"),
          router: path.resolve(__dirname, "./src/router"),
          store: path.resolve(__dirname, "./src/store"),
          styles: path.resolve(__dirname, "./src/styles"),
          views: path.resolve(__dirname, "./src/views"),
        }
      }
    });
  },

  devServer: {
    // host: '192.168.1.141',
    port: 8081, // 端口号
    open: 'Chrome',
    proxy: {
      '/site': {
        target: "http://192.168.1.25:6023/",
        "secure": true,
        "changeOrigin": true,
        "pathRewrite": {
          "^/site": "/"
        }
      },
      '/ius': {
        target: 'http://192.168.1.25:6023/',
        secure: true,
        changeOrigin: true,
      }
    },
  },
};
