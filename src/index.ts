import { StorageCls, Key, Expire, Data, Result } from "./type";
import { Dictionares } from "./enum";
export class Storage implements StorageCls {
  get<T>(key:Key):Result<T | null> {

    const value = localStorage.getItem(key)

    if(value) {
      const data:Data<T> = JSON.parse(value)
      const now = new Date().getTime()
      // 判断有没有过期
      if(typeof data.__expire__ == 'number' && data.__expire__ < now)  {
        this.remove(key)
        return {
          message: `您的${key}已过期`,
          value: null
        }
      } else {
        return {
          message: `成功`,
          value: data.value
        }
      }
    }else {
      return {
        message: "值无效",
        value: null
      }
    }
  }

  set <T>(key: Key, value: T, expire:Expire = Dictionares.premanent) {
    const data = {
      value, // 用户value
      [Dictionares.expire]: expire  // 过期时间
    }
    localStorage.setItem(key, JSON.stringify(data))
    
  }

  remove(key: Key) {
    localStorage.removeItem(key)
  }

  clear() {
    localStorage.clear()
  }
}