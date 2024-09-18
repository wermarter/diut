import { isPlainObject } from 'es-toolkit'

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
    } else if (Array.isArray(obj[key])) {
      obj[key] = obj[key].map((item: unknown) => {
        return typeof item === 'string' ? item.trim() : trimObjectValues(item)
      })
    } else if (typeof obj[key] === 'object') {
      trimObjectValues(obj[key])
    }
  }

  return obj
}

export function dedupSpaces(str: string) {
  return str
    .split(' ')
    .filter((word) => word.length > 0)
    .join(' ')
}

export function createProxyObj<T extends object>(sourceFactory: () => T) {
  return new Proxy({} as T, {
    get(_, propName) {
      const sourceObject = sourceFactory()
      const prop = sourceObject[propName]

      if (typeof prop === 'function') {
        // it exposes the original object to the method, potentially allowing it to be passed further and breaking other proxied functionality
        return prop.bind(sourceObject)
      } else {
        return prop
      }
    },
    set(_, propName, value) {
      return Reflect.set(sourceFactory(), propName, value)
    },
    ownKeys() {
      return Reflect.ownKeys(sourceFactory())
    },
    getPrototypeOf() {
      return Reflect.getPrototypeOf(sourceFactory())
    },
    getOwnPropertyDescriptor(_, prop) {
      return Reflect.getOwnPropertyDescriptor(sourceFactory(), prop)
    },
    has(_, prop) {
      return Reflect.has(sourceFactory(), prop)
    },
    deleteProperty(_, p) {
      return Reflect.deleteProperty(sourceFactory(), p)
    },
    defineProperty(_, prop, descriptor) {
      return Reflect.defineProperty(sourceFactory(), prop, descriptor)
    },
    preventExtensions() {
      return Reflect.preventExtensions(sourceFactory())
    },
    isExtensible() {
      return Reflect.isExtensible(sourceFactory())
    },
    setPrototypeOf(_, prototype) {
      return Reflect.setPrototypeOf(sourceFactory(), prototype)
    },
  })
}
