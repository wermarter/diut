export type StringOrKeysOf<T> = keyof T extends never ? string : keyof T

export type ValueOf<T> = T[keyof T]

type MissingKeys<
  TKeyArray extends Array<unknown>,
  TEntity extends object,
> = Exclude<keyof TEntity, TKeyArray[number]>

export type AssertAllKeysInArray<
  TKeyArray extends Array<unknown>,
  TEntity extends object,
> = MissingKeys<TKeyArray, TEntity> extends never ? true : false
