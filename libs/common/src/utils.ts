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

function extractSecondHalf(items: string[]) {
  return items.slice(items.length / 2)
}

export function stringEnumValues<TEnum>(
  targetEnum: TEnum,
  isSameKeyValue = true,
) {
  const values = Object.values(targetEnum)

  if (isSameKeyValue) {
    return values as (keyof TEnum)[]
  }

  return extractSecondHalf(values) as (keyof TEnum)[]
}

export function stalkEmitter(emitter: any) {
  var oldEmit = emitter.emit
  emitter.emit = function () {
    var emitArgs = arguments
    console.log({ emitArgs })
    oldEmit.apply(emitter, arguments)
  }
}

export function trimObjectValues<T extends { [key: string]: any }>(obj: T) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = obj[key].trim()
    } else if (typeof obj[key] === 'object') {
      trimObjectValues(obj[key])
    }
  }

  return obj
}
