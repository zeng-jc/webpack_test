/**
 * 这是webpack配置文件
 */

//这里需要依赖node中的包，所以要最先创建配置文件package.json，
//node管理这些包的时候需要用到的东西，都写在package.json（配置文件）中
const path = require('path');

//将打包时的入口和出口都写入（映射）到配置文件中（./src/main.js ./dist/bundle.js）
module.exports = {
  //入口
  entry: './src/main.js',
  //出口：为对象 path标识路径 filename标识文件名
  output: {
    //这里的路径需要绝对路径，但是又不能写死，否则不灵活
    //所以这里使用path的resolve方法，将两个地址进行拼接
    //__dirname获取当前文件所在的路径，然后拼接一个list，这样就拿到了一个灵活的绝对路径
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'dist/',//只要是url的文件就会在前面添加这个路径
  },
  module: {
    rules: [
      {
        //css-loader 只负责加载css文件，并返回css代码
        //stye-loader 将模块的导出作为样式添加到DOM中
        //使用多个loader时是从右向左边读取
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
      }
    ],
  },

}