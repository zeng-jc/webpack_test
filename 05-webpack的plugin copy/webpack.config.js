const path = require('path');
//vue-loader 版本过高需要依赖
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//将打包时的入口和出口都写入（映射）到配置文件中（./src/main.js ./dist/bundle.js）
module.exports = {
  //入口
  entry: './src/main.js',
  //出口：为对象 path标识路径 filename标识文件名
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    // publicPath: 'dist/',//只要是url的文件就会在前面添加这个路径
  },
  //应该如何解析模块
  module: {
    rules: [//规则
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      //加载less文件的配置
      {
        test: /\.less$/i,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
          },
        ],
      },
      //加载url地址文件的配置
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              //限制url的大小,小于这个值图片会编译成为base64字符串形式  
              //大于这个值使用file-loader加载
              limit: 15000,
              name: 'img/[name].[hash:8].[ext]'
            },
          },
        ],
      },
      //es6转es5
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          //预设：指示babel做怎样的兼容处理
          presets: ['@babel/preset-env']
        }
      },
      //配置vue
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
    ],
  },
  //打包但不压缩
  mode: 'development',
  plugins: [
    new VueLoaderPlugin(),//vue-loader 版本过高需要配置
    //设置版权信息
    new webpack.BannerPlugin('最终版权归aa所有'),
    new HtmlWebpackPlugin({
      //这里指定打包到dist文件中的html文件模板，这里会自动找到目录下的index.html
      template: 'index.html'
    })
  ],

  //我们默认使用的vue版本时 runtime-only，所以不能挂在template
  //这里可以设置vue版本为 runtime-compiler 
  resolve: {
    //alias:别名
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  //给dist目录配置一个本地服务器
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }

};