import { isPlainObject } from 'lodash'

export const flattenKeys = (obj: object, currentpath: string) => {
  let paths: string[] = []

  for (const k in obj) {
    if (isPlainObject(obj[k]) || Array.isArray(obj[k])) {
      paths = paths.concat(
        flattenKeys(obj[k], currentpath ? `${currentpath}.${k}` : k)
      )
    } else {
      paths.push(currentpath ? `${currentpath}.${k}` : k)
    }
  }

  return paths
}
