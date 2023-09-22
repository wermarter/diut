import { isPlainObject } from 'lodash'

export const flattenKeys = (obj: object, currentpath: string) => {
  let paths: string[] = []

  for (const k in obj) {
    if (isPlainObject(obj[k]) || Array.isArray(obj[k])) {
      paths = paths.concat(
        flattenKeys(obj[k], currentpath ? `${currentpath}.${k}` : k),
      )
    } else {
      paths.push(currentpath ? `${currentpath}.${k}` : k)
    }
  }

  return paths
}

export const numericEnumArray = (targetEnum: object) => {
  return Object.values(targetEnum).filter((elm) => !isNaN(Number(elm)))
}

export function stalkEmitter(emitter: any) {
  var oldEmit = emitter.emit
  emitter.emit = function () {
    var emitArgs = arguments
    console.log({ emitArgs })
    oldEmit.apply(emitter, arguments)
  }
}
