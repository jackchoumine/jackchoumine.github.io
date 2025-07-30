import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { URL, fileURLToPath } from 'node:url'
import path from 'path'
import { defineConfig } from 'vite'
import { analyzer } from 'vite-bundle-analyzer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    analyzer({
      analyzerPort: 8081,
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/main.ts'),
      },
      output: {
        // 设置输出入口文件名为 main.js
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',

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
            if (dep.startsWith('lodash')) return 'lodash'
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
