/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-02-13 09:04:55
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-10-16 10:14:54
 * @Description : 导出工具函数
 */
export type { Cb, Off } from './eventBus'

export { copyToClipboard, copyText, addWaterMarker } from './tools'
export type { WaterMakerParams } from './tools'
export { default as EventBus } from './eventBus'

export { default as createStorage, storage } from './storage'

export function add(a, b) {
  return a + b
}
export * from './utils'
