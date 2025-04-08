/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-04-08 10:32:53
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-04-08 10:33:00
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    setupFiles: ['./vitest.setup.ts'], // 可选：全局初始化文档
  },
})
