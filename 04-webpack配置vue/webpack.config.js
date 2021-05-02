//这里需要依赖node中的包，所以要最先创建配置文件package.json，
//node管理这些包的时候需要用到的东西，都写在package.json（配置文件）中
const path = require('path');
//vue-loader 版本过高需要依赖
const VueLoaderPlugin = require('vue-loader/lib/plugin');

//将打包时的入口和出口都写入（映射）到配置文件中（./src/main.js ./dist/bundle.js）
module.exports = {
  //入口
  entry: './src/main.js',
  //出口：为对象 path标识路径 filename标识文件名
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'dist/',//只要是url的文件就会在前面添加这个路径
  },
  module: {
    rules: [
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
              limit: 15000,//默认一般就是8196（8kb）

              //img：表示文件夹，其中[]里面是变量
              // / ：斜杠后面表示文件名
              //[name]：表示文件本身名字
              //[hash:8]：表示hash值8位
              //[ext]：ext表示文件扩展名
              name: 'img/[name].[hash:8].[ext]'
            },
          },
        ],
      },
      //es6转es5
      {
        test: /\.m?js$/,
        //exclude除开
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
      //配置vue
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
    ],
  },
  //vue-loader 版本过高需要配置
  plugins:[
    new VueLoaderPlugin()
  ],

  //我们默认使用的vue版本时 runtime-only，所以不能挂在template
  //这里可以设置vue版本为 runtime-compiler
  resolve: {
    //alias:别名
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }

}