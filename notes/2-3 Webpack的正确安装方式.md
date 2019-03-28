搭建Webpack环境  
webpack是基于nodejs开发的模块打包工具，本质上是由nodejs实现的  
全局安装webpack(不推荐)
```
npm install webpack webpack-cli -g
```
项目内安装webpack(推荐，不同项目中能使用不同版本的webpack)
```
npm install webpack webpack-cli --save-dev
```
测试webpack是否安装成功
```
webpack -v
```
需要注意的是只有全局安装的webpack才能使用上面的命令，因为nodejs会默认走全局的webpack，但此时webpack我们并没有全局安装,但是nodejs提供了npx命令  
npx会运行当前项目中node_module中的模块
```
npx webpack -v
```