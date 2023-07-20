/*
 * @Description : 全局类型声明
 * @Date        : 2021-10-11 22:38:13 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-11-07 20:08:40 +0800
 * @LastEditors : JackChou
 */
import { Ref } from 'vue'
// declare type AnyObject = Record<string, unknown>
declare global {
  type MaybeRef<T = unknown> = Ref<T> | T
  type AnyObject = Record<string, unknown>
}
