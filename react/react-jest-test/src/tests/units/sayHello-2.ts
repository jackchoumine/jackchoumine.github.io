/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-20 01:28:38
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-20 01:52:15
 * @Description :
 */
import CAPITALIZE from './config-default'

export const sayHello = (name: string) => {
  let result = 'Hi, '
  console.log(CAPITALIZE, 'zqj log')
  if (CAPITALIZE) {
    result += name[0].toUpperCase() + name.substring(1, name.length)
  } else {
    result += name
  }

  return result
}
