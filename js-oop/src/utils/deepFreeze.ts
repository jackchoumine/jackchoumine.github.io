/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-09-27 18:23:55
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-09-27 18:29:09
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K]
}

export { deepFreeze }

function deepFreeze<T extends object>(obj: T): DeepReadonly<T> {
  Object.freeze(obj)

  Object.getOwnPropertyNames(obj).forEach(prop => {
    const value = (obj as any)[prop]
    const isObj =
      value !== null && (typeof value === 'object' || typeof value === 'function')
    if (isObj && !Object.isFrozen(value)) {
      deepFreeze(value)
    }
  })

  return obj as DeepReadonly<T>
}
