//开发时的依赖
//因为webpack-merge是一个模块对象，导出的时merge（注意！！他不是默认导出所以必须结构赋值）
const {merge} = require('webpack-merge');
const baseConfig = require('./base.config.js');
const path = require('path');

module.exports = merge(baseConfig, module.exports = {
  //给dist目录配置一个本地服务器
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
})