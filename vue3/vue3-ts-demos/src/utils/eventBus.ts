// @ts-nocheck
/*
 * @Description :
 * @Date        : 2021-11-10 21:37:47 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-11-10 21:39:03 +0800
 * @LastEditors : JackChou
 */
import emitter from 'tiny-emitter/instance'

export const event = {
  emit: (...args) => emitter.emit(...args),
  on: (...args) => emitter.on(...args),
  off: (...args) => emitter.off(...args),
  once: (...args) => emitter.once(...args),
}
