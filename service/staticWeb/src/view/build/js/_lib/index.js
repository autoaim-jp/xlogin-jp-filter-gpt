/* /_lib/index.js */
import * as xdevkitMod from './_xdevkit/index.js'
import * as commonMod from './_common/index.js'

export const xdevkit = xdevkitMod
export const common = commonMod

/* debug */
export const getCaller = () => {
  const callerInfo = new Error().stack.replace(/^Error\n.*\n.*\n/, '')
  return callerInfo
}

/* asocial */
export const monkeyPatch = () => {
  if (typeof Element.prototype.clearChildren === 'undefined') {
    Object.defineProperty(Element.prototype, 'clearChildren', {
      configurable: true,
      enumerable: false,
      value() {
        while (this.firstChild) {
          this.removeChild(this.lastChild)
        }
      },
    })
  }

  if (typeof window.argNamed === 'undefined') {
    /*
     * asocialの考え方ではどうしても引数が多くなる。
     * そのため、action, core, modなどのパーツのオブジェクトに分けて引数を渡す。
     * argNamedはその入れ子のArray, Objectをflatにする。
     * Arrayの中に含められるのは関数だけ。関数以外はObjで渡す。
     * { a: { param, obj, string, }, b: [ func, ], c: {}, } => { param, obj, string, func, }
     */
    window.argNamed = (obj) => {
      const flattened = {}

      Object.keys(obj).forEach((key) => {
        if (Array.isArray(obj[key])) {
          Object.assign(flattened, obj[key].reduce((prev, curr) => {
            if (typeof curr === 'undefined') {
              throw new Error(`[error] flat argument by list can only contain function but: ${typeof curr} @${key}\n===== maybe you need make func exported like  module.exports = { func, } =====`)
            } else if (typeof curr === 'function') {
              prev[curr.name] = curr
            } else {
              throw new Error(`[error] flat argument by list can only contain function but: ${typeof curr} @${key}`)
            }
            return prev
          }, {}))
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          Object.assign(flattened, obj[key])
        } else {
          flattened[key] = obj[key]
        }
      })

      return flattened
    }
  }
}

export const redirect = (response) => {
  if (response && response.redirect) {
    window.location.href = response.redirect
  }
}

