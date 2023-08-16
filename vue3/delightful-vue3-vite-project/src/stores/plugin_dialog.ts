/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-16 19:21:09
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-16 21:01:50
 * @Description : 管理弹窗的 pinia 插件
 */
import type { PiniaPlugin, PiniaPluginContext } from 'pinia'
import type { ShallowReactive } from 'vue'

type DialogOptions = {
  id?: string | number | Symbol
  title?: string
  content?: string
  props: Record<string, any>
  onClose?: () => void
}

export type Dialog = {
  items: ShallowReactive<DialogOptions>[]
  frontDialog: null | string | number | Symbol // 靠近用户的弹窗
  zIndex: number
  onClose: (id) => void
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
    onClose: id => {
      console.log('关闭弹窗')
      const index = dialogState.items.findIndex(item => item.id !== id)
      dialogState.items.splice(index, 1)
    },
    open: (options: DialogOptions) => {
      console.log('打开弹窗')
      console.log(options)
      if (!options.id) {
        options.id = new Date().toString()
        dialogState.items.push(options)
        return
      }
      const exist = items.find(item => item.id === options.id)
      if (exist) {
        dialogState.frontDialog = exist.id
      } else {
        dialogState.items.push(options)
      }
    },
  }
  const dialog: Dialog = {
    ...dialogState,
    ...actions,
  }
  return () => ({ dialog })
}
