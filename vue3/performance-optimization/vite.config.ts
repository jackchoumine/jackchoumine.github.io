/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-07-31 00:15:16
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-07-31 01:09:55
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { URL, fileURLToPath } from 'node:url'
import path from 'path'
//import visualizer from 'vite-bundle-visualizer'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import { analyzer } from 'vite-bundle-analyzer'
import htmlMinifier from 'vite-plugin-html-minifier'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    htmlMinifier(),
    analyzer({
      analyzerPort: 8081,
    }),
    visualizer({ open: false, template: 'sunburst' }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        // 设置输出入口文件名为 main.js
        //entryFileNames: 'js/[name].js',
        //chunkFileNames: 'js/[name]-[hash].js',
        //assetFileNames: '[ext]/[name]-[hash].[ext]',
        // 入口文件不加 hash
        entryFileNames: chunkInfo => {
          if (chunkInfo.name === 'main') {
            return 'js/main.js' // 不加 hash
          }
          return 'js/[name]-[hash].js'
        },
        // 动态分包的 chunk 根据 name 判断是否加 hash
        chunkFileNames: chunkInfo => {
          if (['vue', 'vue-router', 'pinia', 'element-plus'].includes(chunkInfo.name)) {
            return `js/${chunkInfo.name}.js`
          }
          return 'js/[name]-[hash].js'
        },
        assetFileNames: chunkInfo => {
          const chunkName = chunkInfo.name
          if (chunkName?.includes('element-plus')) {
            return '[ext]/[name].[ext]'
          }
          return '[ext]/[name]-[hash].[ext]'
        },

        // ✅ 手动分包配置
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 第三方依赖
            const index = id.indexOf('node_modules')
            const end = id.slice(index)
            const [_0, dep] = end.split('/')
            //console.log({ dep }, 'zqj')
            if (dep.includes('vue-router')) return 'vue-router'
            if (dep.includes('vue')) return 'vue'
            if (dep.includes('pinia')) return 'pinia'
            if (dep.startsWith('lodash-es')) return 'lodash-es'
            //if (dep.startsWith('lodash')) return 'lodash'
            if (dep.startsWith('element-plus')) return 'element-plus'
            return 'vendor' // 其他库统一放这里
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    open: true,
  },
})
