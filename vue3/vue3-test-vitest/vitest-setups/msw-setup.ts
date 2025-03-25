/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-03-24 18:07:27
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-03-24 18:08:33
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
import { beforeAll, afterAll } from 'vitest'

import { server } from '../src/mocks/node'

beforeAll(() => {
  console.log('全局 beforeAll')
  server.listen()
})

afterAll(() => {
  console.log('全局 afterAll')
  server.close()
})
