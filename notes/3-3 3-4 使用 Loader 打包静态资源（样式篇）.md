有这样一个需求，希望让图片变成150*150的小图片。所以需要写一个样式来修饰图片'index.css'(放在src目录下)
```
'index.css'

.avatar {
  width: 150px;
  height: 150px;
}
```
我们希望index页面在渲染图片的时候让它有avatar这个class名字
```
'index.js'

//ES6
import avatar from './avatar.jpg'
import './index.css'

let img = new Image()
// avatar其实就是一个图片的地址
img.src = avatar
img.classList.add('avatar')
let root = document.getElementById("root")
root.append(img)
```
这时运行'npm run bundle'肯定会报错,提示webpack布置如何处理css这种类型的文件
```
ERROR in ./src/index.css 1:0
Module parse failed: Unexpected token (1:0)
You may need an appropriate loader to handle this file type.
> .avatar {
|   width: 150px;
|   height: 150px;
 @ ./src/index.js 8:0-20
```
这时又需要配置webpack了, 打包css文件需要用到两个loader，所以user项是一个数组  
'css-loader', 'style-loader'(同样需要下载), 'npm install style-loader css-loader -D'
```
'webpack.config.js'

module: {
  rules: [{
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
  }]
}
```
'css-loader': 帮助我们分析出几个css文件之间的相互关, 最终把这些css文件合并成一段css代码
```
'avatar.css'

.avatar {
  width: 150px;
  height: 150px;
}
``` 
```
'index.css'

@import './avatar.css'
```
```
'index.js'

import './index.css'
```
'style-loader': 在得到css-loader生成的css内容之后，会把这段内容挂载到页面的head部分  
所以在处理css这种文件打包的时候需要配合使用css-loader和style-loader  

如果我们不想在代码里写css，而是去写一些scss，stylus...一些新潮的样式文件还需要其他loader帮助生成css代码(比如'sass-loader', 'stylus-loader'...同样这些loader都需要下载)  
这里需要注意的是webpack对于loader是由执行先后顺序的(从下到上，从右到左)
```
'webpack.config.js'

{
  test: /\.scss$/,
  use: ['style-loader', 'css-loader', 'sass-loader']
}
1. sass-loader
2. css-loader
3. style-loader
```
特别注意在安装sass-loader时需要安装'node-sass'，而在更新node-sass中，有时候也会出现资源下载不了的问题，通常是git上的资源下载不了，这时候可以更改node-sass的资源路径为淘宝的，然后再下载node-sass
```
npm config set sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
```