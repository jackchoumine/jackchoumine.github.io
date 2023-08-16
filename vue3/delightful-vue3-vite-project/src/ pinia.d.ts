/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-04-09 17:01:17
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-16 19:47:42
 * @Description : pinia 类型追加
 */
import 'pinia'

import type { Dialog } from '@/src/stores/plugin_dialog'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    name: Ref<string>
    secret: string
    pluginVar: string
    // hello: string
    dialog: Dialog //Record<string, any>
  }
}
