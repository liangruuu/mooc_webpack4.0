/**
 * CommonJS
 * let avatar = require('./avatar.jpg')
 */

//ES6
import avatar from './avatar.jpg'
import './index.scss'

let img = new Image()
// avatar其实就是一个图片的地址
img.src = avatar
img.classList.add('avatar')
let root = document.getElementById("root")
root.append(img)