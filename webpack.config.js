const path = require('path')
// CommonJS语法
module.exports = {
  /**
   * mode: 配置环境或者模式
   * entry: 项目打包入口文件
   * output: 打包文件放置地址，是个对象可以配置
   *  -filename: 打包好的文件名
   *  -path: 打包好的文件所存放在的文件夹，必须配置绝对路径(使用node模块来设置路径)
   * module: 模块
   *  -rules: 配置规则，是一个数组
   */
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  module: {
    rules: [{
      test: /\.jpg$/,
      use: {
        loader: 'file-loader'
      }
    }]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}