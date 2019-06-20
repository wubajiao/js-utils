/*
 * @Author: hayden
 * @Date: 2018-11-30 11:16:04
 * @Last Modified by: hayden
 * @Last Modified time: 2018-11-30 11:17:06
 * @Reference https://github.com/mqyqingfeng/Blog/issues/26
 */

export default function (func, wait, options = {}) {
  let timeout, context, args
  let previous = 0

  let later = function () {
    previous = options.leading === false ? 0 : new Date().getTime()
    timeout = null
    func.apply(context, args)
    if (!timeout) context = args = null
  }

  let throttled = function () {
    let now = new Date().getTime()
    if (!previous && options.leading === false) previous = now
    let remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
  }

  throttled.cancel = function () {
    clearTimeout(timeout)
    previous = 0
    timeout = null
  }

  return throttled
}
