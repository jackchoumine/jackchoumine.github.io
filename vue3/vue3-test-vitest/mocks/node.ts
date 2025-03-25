/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-03-24 15:19:59
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-03-24 15:59:17
 * @Description : 配置 node 中的 server
 */
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)
