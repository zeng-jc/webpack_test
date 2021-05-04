//生产时的依赖
const {merge} = require('webpack-merge');  
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig,{
  mode: 'development',
})