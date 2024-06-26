/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-02-19 17:36:55
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-05-14 11:24:09
 * @Description :
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import { HstVue } from '@histoire/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), HstVue(), dts({ include: './components' })],
  build: {
    minify: true,
    // NOTE css分离 组件内部没有样式 无需配置
    // cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, './components/index.js'),
      name: 'es-ui',
      fileName: 'es-ui',
    },
    rollupOptions: {
      // 排除不想打包的依赖
      external: ['vue'],
      // output: {
      //   // 外部依赖为一个全局变量
      //   globals: {
      //     vue: 'Vue',
      //   },
      //   // exports: 'named',
      // },
      output: [
        {
          format: 'es',
          // 不用打包成 .es.js, 这里我们想把它打包成.js
          entryFileNames: '[name].js',
          // 让打包目录和我们目录对应
          preserveModules: true,
          // 配置打包根目录
          dir: 'dist',
          preserveModulesRoot: 'src',
        },
      ],
    },
  },
})
