//1、commonjs模块化思想
const { add, mul } = require('./js/mathUtils.js');

console.log(add(10, 10));
console.log(mul(10, 10));

//2、es6模块化
import { name, age, height } from './js/info.js';
console.log(name);
console.log(age);
console.log(height);

//3、依赖样式文件
require('./css/normal.css');

//4、依赖less文件
require('./css/less.less');
document.writeln('hello less');

//5、使用vue
import Vue from 'vue';
//导入vue文件
import App from './vue/App.vue';

new Vue({
  el: '#app',
  template: '<App/>',//在这里使用组件，然后覆盖el
  components:{
    App
  }
})
//el 和 template的区别
//在编译代码的时候vue会自动的将el挂载的元素替换为template的内容



