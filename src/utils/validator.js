/* eslint-disable */

class Validator {
  validateIP(data) {
    const reg = /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/
    return data !== '' && reg.test(data)
  }

  validatePort(data) {
    const reg = /^\d+$/
    if (!reg.test(data)) {
      return false
    }

    let num = parseInt(data)
    if (num === NaN) {
      return false
    } else {
      return num >= 0 && num <= 65535
    }
  }

  validateLabelType(data) {
    const reg = /^\d+$/
    if (!reg.test(data)) {
      return false
    }

    let num = parseInt(data)
    if (num === NaN) {
      return false
    } else {
      return num >= 0 && num <= 1
    }
  }
}

export default new Validator()
