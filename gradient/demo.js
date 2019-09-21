// 使用示例
import Gradient from './Gradient'

const gradient = new Gradient(['rgba(0,128,0,1)', 'yellow', 'rgb(255,165,0)', '#ff0000'])

console.log(gradient.getColor(12)) // rgba(93, 174, 0, 255)
console.log(gradient.getColor(22)) // rgba(172, 213, 0, 255)
console.log(gradient.getColors()) // (100) [Array(4), ...]