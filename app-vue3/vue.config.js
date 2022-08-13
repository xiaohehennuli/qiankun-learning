const { name } = require("./package")
module.exports = {
  devServer: {
    headers: {
      // 配合乾坤开启CORS跨域,因为主应用要去发请求获取子应用的资源
      "Access-Control-Allow-Origin": "*",
    },
  },
  configureWebpack: {
    output: {
      // 必须打包出一个库
      library: `${name}-[name]`,
      // 必须是一个umd格式
      libraryTarget: "umd", // 把微应用打包成 umd 库格式
      chunkLoadingGlobal: `webpackJsonp_${name}`,
    },
  },
}
