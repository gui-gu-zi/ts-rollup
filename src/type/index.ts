import { Dictionares } from "../enum"


export type Key = string
export type Expire = Dictionares.premanent | number  // 时间戳或者 Dictionares.premanen
export interface Data<T> {
  value: T,
  [Dictionares.expire]:Expire
}
export interface Result<T> {
  message: string,
  value: T | null
}

export interface StorageCls {
  get:<T> (key:Key) => void
  set:<T> (key: Key, value: T, expire: Expire) => void
  remove: (key:Key) => void
  clear: () => void
}
