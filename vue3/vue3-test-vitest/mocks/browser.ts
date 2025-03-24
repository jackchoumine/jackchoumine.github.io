/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-03-24 15:19:59
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-03-24 15:59:03
 * @Description : 配置浏览器里 worker
 */
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)
