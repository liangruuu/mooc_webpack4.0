// ES Module 模块引入方式
// CommonJS 模块引入方式
// CMD, AMD...

// webpack 模块打包工具

// import Header from './header.js'
// import Content from './content.js'
// import Sidebar from './sidebar.js'

let Header = require('./header.js')
let Content = require('./content.js')
let Sidebar = require('./sidebar.js')

// let header = document.createElement('div')
// header.innerText = 'header'
// dom.append(header)

// let sidebar = document.createElement('div')
// sidebar.innerText = 'sidebar'
// dom.append(sidebar)

// let content = document.createElement('div')
// content.innerText = 'content' 
// dom.append(content)

new Header()
new Content()
new Sidebar()  