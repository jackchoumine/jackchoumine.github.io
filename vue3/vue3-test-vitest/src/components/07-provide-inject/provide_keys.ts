/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-09-08 17:39:32
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-09-08 22:06:50
 * @Description : provide 的 key
 */
import type { InjectionKey } from 'vue'

export interface NameType {
  name: string
  changeName: () => void
}
export const name_key = Symbol('name') as InjectionKey<NameType>

export interface AgeType {
  age: number
  changeAge: () => void
}

export const age_key = Symbol('age') as InjectionKey<AgeType>
