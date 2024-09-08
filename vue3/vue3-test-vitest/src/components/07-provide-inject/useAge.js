/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-09-08 21:46:40
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-09-08 21:48:00
 * @Description :
 */
import { inject } from 'vue'
import { age_key } from './provide_keys'

export function useAge() {
  const injection = inject(age_key)
  return injection
}
