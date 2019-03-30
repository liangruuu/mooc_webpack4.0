```
Hash: 180a3385b891000a66df
Version: webpack 4.29.6
Time: 221ms
Built at: 2019-03-30 11:07:24
    Asset      Size  Chunks             Chunk Names
bundle.js  1.36 KiB       0  [emitted]  main
Entrypoint main = bundle.js
[0] ./src/index.js 163 bytes {0} [built]
[1] ./src/header.js 219 bytes {0} [built]
[2] ./src/content.js 226 bytes {0} [built]
[3] ./src/sidebar.js 226 bytes {0} [built]

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/concepts/mode/
```
1.Asset: 打包后的文件
2.Chunks: 文件ID，当做一些复杂打包的时候会打包出很多文件，每一个文件队友对应的唯一ID值
3.Chunk Names: JS文件对应的名字
4.Entrypoint main = bundle.js: 整个打包过程对应的入口文件是main.js，打包成bundle.js
```
'webpack.config.js'

entry: './src/index.js',

entry: {
  // 这里的main对应着Chunk Names
  main: './src/index.js'
},
```
上面的一行是对下面一行的简写  

警告信息的意思是：在webpack配置的时候没有指定打包的环境或者模式(打包后的代码是否被压缩)，默认模式为production，可以设置为development
```
'webpack.config.js'

mode: 'production'
```