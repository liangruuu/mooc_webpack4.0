之前打包的文件都是JS类型的文件，但是如果我们想打包图片类型的文件该怎么办呢
```
// 在没有配置有关图片打包的webpack配置项之前运行'npm run bundle'

ERROR in ./src/avatar.jpg 1:0
Module parse failed: Unexpected character '�' (1:0)
You may need an appropriate loader to handle this file type.
(Source code omitted for this binary file)
 @ ./src/index.js 4:13-36
```
因为webpack最初只是为了打包处理JS文件，所以是默认知道如何打包JS文件的，但是它却不知道如何打包JPG这种类型的文件。正式因为webpack不知道，所以我们需要告诉它如何打包('webpack.config.js')
```
'webpack.config.js'

// module: 模块
//  -rules: 配置规则，是一个数组
// 用'file-loader'帮助加载JPG格式的文件，首先得引入'file-loader' -> 'npm install file-loader -D'
module: {
  rules: [{
    test: /\.jpg$/,
    use: {
      loader: 'file-loader'
    }
  }]
}
```
```
> npm run bundle

Hash: b89c6185b6821ec6bf97
Version: webpack 4.29.6
Time: 588ms
Built at: 2019-03-30 12:38:15
                               Asset      Size  Chunks             Chunk Names
                           bundle.js  5.93 KiB    main  [emitted]  main
c6fe896239c722e99b89ab06ba0991e9.jpg  25.5 KiB          [emitted]
```

loader其实就是一个打包的方案，它知道对于某一个特定类型的文件webpack应该如何进行打包(webpack本身不知道，但是loader知道)