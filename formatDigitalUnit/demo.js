import formatDigitalUnit from './formatDigitalUnit'

console.log(formatDigitalUnit(2333)) // 2.33k
console.log(formatDigitalUnit(23333333)) // 23.33M
console.log(formatDigitalUnit(233333333333)) // 233.33G

console.log(formatDigitalUnit(233333333333, { precision: 0 })) // 233G
console.log(formatDigitalUnit(46666666666666, { precision: 1 })) // 46.7T