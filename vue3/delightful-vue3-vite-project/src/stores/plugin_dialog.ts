/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-16 19:21:09
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-06-23 19:24:52
 * @Description : 管理弹窗的 pinia 插件
 */
import type { PiniaPlugin, PiniaPluginContext } from 'pinia'
import type { ShallowReactive } from 'vue'

type DialogOptions = {
  id?: string | number //  | symbol TODO  vue prop type 不支持 symbol
  title?: string
  content?: string
  props: Record<string, any>
  onClose?: () => void
}

export type Dialog = {
  items: ShallowReactive<DialogOptions>[]
  frontDialog: string | number | symbol | null // 靠近用户的弹窗
  zIndex: number
  close: (id) => void
  open: (options: DialogOptions) => void
}

export default function pluginDialog(): PiniaPlugin {
  // 弹窗列表，可能打开多个弹窗
  const items = shallowReactive([])
  const dialogState = {
    items,
    frontDialog: null,
    zIndex: 100,
  }
  // 弹窗操作
  const actions = {
    close: id => {
      console.log('关闭弹窗', id)
      const item = dialogState.items.find(item => item.id === id)
      const index = dialogState.items.findIndex(item => item.id === id)
      item.onClose?.()
      nextTick(() => {
        dialogState.items.splice(index, 1)
      })
    },
    open: (options: DialogOptions) => {
      console.log('打开弹窗')
      console.log(options)
      if (!options.id) {
        options.id = Math.random().toString(36).slice(3)
        dialogState.items.push(options)
        return
      }
      const exist = items.find(item => item.id === options.id)
      if (exist) {
        // 已经存在，提到最前面，通过 index 控制层级
        dialogState.frontDialog = exist.id
      } else {
        const index = dialogState.items.length
        dialogState.items.push({
          ...options,
          zIndex: index + 1 + dialogState.zIndex,
        })
      }
    },
  }
  const dialog: Dialog = {
    ...dialogState,
    ...actions,
  }
  return () => ({ dialog })
}
