import * as winston from 'winston'

const FIXED_CALLSTACK_ORDER = 9

export const injectStackFormat = winston.format((info) => {
  // Do not inject "source" from exceptions caught by Nest
  if (info.context === 'ExceptionsHandler') {
    return info
  }

  const callsiteObj = traceCaller(FIXED_CALLSTACK_ORDER)
  return Object.assign({}, info, {
    source: callsiteObj,
  })
})

/**
 * https://stackoverflow.com/questions/20173242/timestamps-disappear-when-adding-the-line-number-configuration-in-node-js-winsto?noredirect=1&lq=1
 * examines the call stack and returns a string indicating
 * the file and line number of the n'th previous ancestor call.
 * this works in chrome, and should work in nodejs as well.
 *
 * @param n : int (default: n=1) - the number of calls to trace up the
 *   stack from the current call.  `n=0` gives you your current file/line.
 *  `n=1` gives the file/line that called you.
 */
function traceCaller(n) {
  Error.stackTraceLimit = 20

  if (isNaN(n) || n < 0) n = 1
  n += 1
  let s = new Error().stack

  let a = s.indexOf('\n', 5)
  while (n--) {
    a = s.indexOf('\n', a + 1)
    if (a < 0) {
      a = s.lastIndexOf('\n', s.length)
      break
    }
  }
  let b = s.indexOf('\n', a + 1)
  if (b < 0) b = s.length
  a = Math.max(s.lastIndexOf(' ', b), s.lastIndexOf('/', b))
  b = s.lastIndexOf(':', b)
  s = s.substring(a + 1, b)
  return s
}
