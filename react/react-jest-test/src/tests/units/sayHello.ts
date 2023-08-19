/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-20 01:28:38
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-20 01:28:40
 * @Description :
 */
import { CAPITALIZE } from './config'

export const sayHello = (name: string) => {
  let result = 'Hi, '

  if (CAPITALIZE) {
    result += name[0].toUpperCase() + name.substring(1, name.length)
  } else {
    result += name
  }

  return result
}
