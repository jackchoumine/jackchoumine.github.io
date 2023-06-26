/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-26 17:59:30
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-06-27 03:32:40
 * @Description : 导出全局指令
 */
import type { App } from 'vue'

import auth from './auth'
import clickOutside from './clickOutside'
import copy from './copy'
import focus from './focus'
import preview from './preview'
import title from './title'
import waterMaker from './waterMaker'

export const directiveObj = {
  copy,
  clickOutside,
  auth,
  title,
  waterMaker,
  preview,
  focus,
}

export default function (app: App<HTMLElement>) {
  Object.keys(directiveObj).forEach(key => {
    app.directive(key, directiveObj[key])
  })
  app.config.globalProperties.testFn = () => {
    console.log('install global properties')
  }
  return app
}
