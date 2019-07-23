const units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']
const defaultPrecision = 2

function formatDigitalUnit (value, options = {}) {
  let _value = parseFloat(value)
  if (Number.isNaN(_value)) {
    throw new Error(`${value} cannot be converted to a number`)
  }
  if (_value === 0) return _value

  let isPositive = _value > 0
  _value = Math.abs(_value)
  const { unit, precision = defaultPrecision } = options
  let index = -1

  if (unit && units.includes(unit)) {
    index = units.indexOf(unit)
    _value = _value / ((index + 1) * 1000)
  } else {
    while (_value / 1000 >= 1) {
      index++
      _value /= 1000
    }
    if (index > units.length - 1) {
      const diff = index - units.length - 1
      _value *= (diff * 1000)
      index = units.length - 1
    }
  }
  if (String(_value).includes('.')) {
    _value = Math.round(_value * (10 ** precision)) / (10 ** precision)
  }
  return `${isPositive ? '' : '-'}${_value}${units[index] || ''}`
}

export default formatDigitalUnit