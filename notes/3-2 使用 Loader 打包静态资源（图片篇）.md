使用file-loader打包图片，在dist目录下图片的名字被打包成了一个很长的字符串'c6fe896239c722e99b89ab06ba0991e9.jpg'  
如果我们想不变动图片的名字，这时候我们就需要对loader进行额外的配置
```
'webpack.config.js'

module: {
  rules: [{
    test: /\.jpg$/,
    use: {
      loader: 'file-loader',
      options: {
        // placeholder 占位符
        name: '[name].[ext]'
      }
    }
  }]
}
```
此时的图片都是被打包到dist目录下，但是我们想自定义一个目录images然后把打包后的图片都存放到这里面
```
'webpack.config.js'

options: {
  // placeholder 占位符
  name: '[name].[ext]',
  outputPath: 'images/'
}
```
图片被打包到dist/images目录下  

url-loader  
'url-loader'能实现'file-loader'的所有功能(先安装url-loader)  
url-loader与'file-loader'不一样的是前者在打包图片时并不会把图片打包到dist目录下的响相应文件夹里，它会把图片转换成base64的字符串，然后直接放在打包后JS文件里(bundle.js),而不是单独生成一个图片文件。这样子的打包方式有好处也有坏处  
好处：  
1.图片打包到JS文件里，实际上加载完JS文件就不需要再去请求一个图片的地址了，省了一次HTTP请求  
坏处：  
1.图片若特别大，打包生成的JS文件也会特别的大，加载JS的时间会很长，所以在一开始很长一段时间页面什么也显示不出来  
所以url-loader最佳使用方式是当图片非常小(几kb)时使用  
使用这种最佳实践的方式也需要配置webpack
```
'webpack.config.js'

options: {
  // placeholder 占位符
  name: '[name].[ext]',
  outputPath: 'images/',
  // 如果图片小于超过2048kb就会使用url-loader方式打包，否则单独打包出一个图片文件
  limit: 2048
}
```