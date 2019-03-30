之前说过webpack是一个模块打包工具，把各个模块打包到一起  
但是引入图片模块的时候和引入JS模块的时候打包流程和方式是完全不一样的  
假如引入的是JS文件，那么直接拿过JS文件执行就行了；但是假如引入的是图片文件，那么实际上是拿到了图片的地址就可以了，并不需要把整个图片打包到JS文件里去  
还有一点，需要设定打包的入口文件，打包后的文件放到哪里都需要被设置。webpack没有智能到给一个文件就知道该如何打包的地步。它需要开发者给定配置文件到底该如何打包文件或者项目  
但是问题来了，之前的项目好像并没有配置过文件，就直接运行'npx webpack index.js'也可以打包成功  
这是因为webpack的团队尽可能地拓展默认的打包配置，让开发者看起来像是没有进行配置  
再提一点：如果在没有配置文件之前运行'npx webpack'的话会报错，因为没有指定项目打包的入口文件. 
形如'npx webpck index.js'就正确了，此时需要在'webpack.config.js'文件里配置入口文件
```
// webpack的配置文件(主目录下)
'webpack.config.js'

const path = require('path')
// CommonJS语法
module.exports = {
  /**
   * entry: 项目打包入口文件
   * output: 打包文件放置地址，是个对象可以配置
   *  -filename: 打包好的文件名
   *  -path: 打包好的文件所存放在的文件夹，必须配置绝对路径(使用node模块来设置路径)
   */
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'bundle')
  }
}
```
此时运行'npx webpack', 不需要指定入口文件(index.js)也可以顺利被编译打包  
注意: 'webpack.config.js'文件名是默认的，不能被更改，若此文件名不是默认名，则需要运行'npx webpack --config xxx.js'来指定webpack的配置文件  

优化项目结构:  
'index.js, header.js, sidebar.js, content.js'在浏览器上不能被直接执行，只有在打包翻译过之后才能在浏览器上运行。所以index.js里的代码不是在浏览器上运行的代码，是我们的源代码，所以一般来说把源代码放在src的文件夹里(同时需要改变webpack.config.js文件)  

一般而言我们在vue或者react项目中很少用到npx命令，基本上都是使用npm run xxx。所以我们需要使用npm script简化打包代码。  
在'package.json'文件里有"scripts"项，scripts是一个对象，能在里面配置一些内容或者命令
```
'package.json'

"scripts": {
  /**
   * 帮助我们打包(如果在"scripts"里)
   * 'npm run bundle' -> 'webpack'
  */
  "bundle": "webpack"
},
```
能注意到这里的命令并不是'npx webpack'而仅仅是'webpack', 'webpack'是去全局查找webpack模块，但是我们并没有全局安装webpack。其实处于"scripts"对象里的模块会默认先查找工程目录下的模块是否被安装，若有直接使用本项目安装的模块  

还记得安装webpack时一同安装的webpack-cli嘛...webpack-cli的作用是能让我们在命令行正确地使用webpack命令。假设不安装webpack-cli，则不能正确使用webpack, npx webpack指令...