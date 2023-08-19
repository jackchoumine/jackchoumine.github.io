/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-20 01:28:38
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-20 02:01:30
 * @Description :
 */
import shouldCapitalize from './config-default-fn'

export const sayHello = (name: string) => {
  let result = 'Hi, '
  if (shouldCapitalize()) {
    result += name[0].toUpperCase() + name.substring(1, name.length)
  } else {
    result += name
  }

  return result
}
