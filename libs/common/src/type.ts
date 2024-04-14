export type StringOrKeysOf<T> = keyof T extends never ? string : keyof T
