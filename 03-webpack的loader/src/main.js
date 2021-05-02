//1、commonjs模块化思想
const {add , mul} = require('./js/mathUtils.js');

console.log(add(10,10));
console.log(mul(10,10));

//2、es6模块化
import {name,age,height} from './js/info.js';
console.log(name);
console.log(age);
console.log(height);

//3、依赖样式文件
require('./css/normal.css');

//4、依赖less文件
require('./css/less.less');

document.writeln('hello webpack');


