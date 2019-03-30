/**
 * CommonJS
 * let avatar = require('./avatar.jpg')
 */

//ES6
import avatar from './avatar.jpg'

let img = new Image()
// avatar其实就是一个图片的地址
img.src = avatar
let root = document.getElementById("root")
root.append(img)