/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-09-08 21:46:40
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-09-08 22:04:52
 * @Description :
 */
import { inject } from 'vue'
import { age_key } from './provide_keys'

export function useAge<T = unknown>() {
  const injection = inject(age_key) as T
  return injection
}
