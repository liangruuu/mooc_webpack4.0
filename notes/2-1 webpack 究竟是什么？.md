```
'index.html'

<body>
  <p>这是我们的原始网页</p>
  <div id="root"></div>
  <script src='./index.js'></script>
</body>
```
```
'index.js'

let header = document.createElement('div')
header.innerText = 'header'
dom.append(header)

let sidebar = document.createElement('div')
sidebar.innerText = 'sidebar'
dom.append(sidebar)

let content = document.createElement('div')
content.innerText = 'content'
dom.append(content)
```
页面的三个部分'header', 'sidebar', 'content'由JS渲染出来   
在没有使用webpack之前，JS能实现的逻辑相对而言是比较弱的，所以可能只是写一写比较基本的JS代码，但是随着前端技术的发展，JS能够实现的内容越来越多。  
所以现在可能在JS代码中增加非常多的逻辑  
那么就会发现如果通过这种面相过程的方式去写代码，代码会变地非常冗长

所有的JS代码都堆砌在一个文件里，这个文件会变得越来越大，最终变得不可维护。  
这个时候出现了一种'面相对象'的编程方式  
则上面三个部分可以分为三个对象来写，创建三个文件
```
'index.html'
// 注意三个文件的文件的引用顺序必须在index.js之前
<script src='./header.js'></script>
<script src='./sidebar.js'></script>
<script src='./content.js'></script>

<script src='./index.js'></script>
```
```
'header.js'

function Header() {
  let header = document.createElement('div')
  header.innerText = 'header'
  dom.append(header)
}
```
```
'index.js'
// 但是单单创建三个文件并且在html文件中引用是没用的,真正的业务逻辑是在index.js文件中编写的
// 所以必须在index.js中创建三个对象
let dom = document.getElementById("root")

new Header()
new Content()
new Sidebar() 
```
使用面向对象可以使代码更具有维护性，关于Header的代码全部放在header对象里，则不同的对象承载的功能逻辑是不一样的，维护起来就方便得多  
以前如果'header'有问题了需要在index.js整篇查找header哪里出了问题；现在只需要在header.js里查找问题就可以了  
但是如果现在把代码拆分成这样子就会出现新的问题："在一个html文件里引入了多个js文件"  
1.整个页面的加载速度会变慢，以前只需要加载一个，现在需要加载四个，意味着一个页面会多出三个http请求  
2.打开index.js，并不能直接看出Header()类对应的文件是什么(看不出文件位置的相互关系)，要是想知道Header()类对应的文件是什么则需要回到index.html中去看(原来header.js和index.js在同一个文件目录下)  
3.很难查错，代码不容易维护
```
// 若content.js文件位置引用错误
// 网页会报错'Content is not defined'
// 但是问题不是出在Content对象，而是出错在引用顺序上
<script src='./index.js'></script>
<script src='./content.js'></script>
```

由此引出了一个想法  
如果想在index.js引用Header，Sidebar，Content，则自己去引入这三个js文件里的内容，形如：
```
import Header from './header.js'
import Content from './content.js'
import Sidebar from './sidebar.js'
```
代码如此去构造能解决之前的几个问题  
1.index.html只引入了index.js一个文件，网页运行速度会很快
```
<body>
  <p>这是我们的原始网页</p>
  <div id="root"></div>
  
  <script src='./index.js'></script>
</body>
```
2.文件之间的依赖关系非常明确，即index.js引用了三个对象，这三个对象的文件处于index.js同级目录中
3.不会出现引用顺序颠倒而导致的代码运行错误问题  

形如" import xxx from 'xxx.js' "是 ES Moudule 模块引入方式  
但是浏览器不支持且无法识别这样子的语句，所以如果想如上去实现代码，目前而言是无法成功的  

此时，就是webpack登场的时候，虽然原生的浏览器不支持import语句，但是webpack能够识别import语句的含义是引入一个JS模块，它能告知浏览器(翻译)这句话的意思，通过webpakc把import语句做一次翻译，浏览器就能正确识别且运行代码  
此时需要安装webpack
```
npm install webpack-cli --save-dev
npm insrall webpack --save
```
```
// 使用webpack翻译index.js文件
npx webpack index.js
```
此时会多出dist目录  
|- dist  
&emsp;|- main.js  
main.js就是webpack帮忙翻译好的文件，则index.html需要引入dist/main.js来代替index.js
```
<body>
  <p>这是我们的原始网页</p>
  <div id="root"></div>

  <!-- <script src='./index.js'></script> -->
  <script src='./dist/main.js'></script>
</body>
```
但是此时会报另一个错误'o.a is not a constructor'  
这是因为只是按照标准导入模块，但是没有按照ES Moudule的方式导出模块(JS文件)
```
'header.js'

function Header() {
  let dom = document.getElementById("root")
  let header = document.createElement('div')
  header.innerText = 'header'
  dom.append(header)
}

export default Header
```
需要注意的是每次编写JS代码需要重新使用webpack翻译一遍代码
```
npx webpack xxx.js
```
总结：感官上来说webpack是JS的一个翻译器(不准确)