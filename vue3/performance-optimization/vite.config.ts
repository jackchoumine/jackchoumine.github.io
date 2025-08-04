/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-07-31 00:15:16
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-08-04 09:33:14
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { URL, fileURLToPath } from 'node:url'
//import visualizer from 'vite-bundle-visualizer'
import { visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import { analyzer } from 'vite-bundle-analyzer'
import Font from 'vite-plugin-font'
import VitePluginHtmlEnv from 'vite-plugin-html-env'
import htmlMinifier from 'vite-plugin-html-minifier'
import minipic from 'vite-plugin-minipic'

// 不常变更的依赖独立输出
const separatedModules = ['vue', 'vue-router', 'pinia', 'element-plus', 'lodash-es']

const picExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp']
// https://vite.dev/config/
export default defineConfig(({ mode, command }) => {
  console.log({ mode, command })
  const plugins = [
    vue(),
    vueJsx(),
    VitePluginHtmlEnv(),
    Font.vite({
      scanFiles: ['src/**/*.{vue,ts,tsx,js,jsx}'],
    }),
  ]
  // 使用 command 来区分生产环境和开发环境 command 的值只有两种
  // NOTE 不要使用 MODE 因为的值任意
  if (command === 'build') {
    plugins.push(
      //htmlMinifier(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      //NOTE 跳过的图片使用
      // https://zhuanlan.zhihu.com/p/354633142 https://tinypng.com/
      minipic({
        limitInputPixels: false,
        cache: false,
        convertPublic: false,
        //exclude: 'min.*',
      }),
      analyzer({
        analyzerPort: 8081,
        openAnalyzer: false,
      }),
      visualizer({
        open: true,
        //template: 'sunburst',
        //template: 'list',
        template: 'treemap',
      })
    )
  }
  return {
    plugins,
    build: {
      rollupOptions: {
        //input: {
        //  main: path.resolve(__dirname, 'index.html'),
        //},
        output: {
          // 设置输出入口文件名为 main.js
          entryFileNames: 'js/app-[hash].js',
          //chunkFileNames: 'js/[name]-[hash].js',
          //assetFileNames: '[ext]/[name]-[hash].[ext]',
          // 入口文件不加 hash
          //entryFileNames: chunkInfo => {
          //  const chunkName = chunkInfo.name
          //  console.log({ chunkName }, 'zqj')
          //  if (chunkInfo.name === 'main') {
          //    return 'js/main.js' // 不加 hash
          //  }
          //  return 'js/[name]-[hash].js'
          //},
          // 动态分包的 chunk 根据 name 判断是否加 hash
          chunkFileNames: chunkInfo => {
            if (findDep(chunkInfo.name, separatedModules)) {
              return `js/${chunkInfo.name}.js`
            }
            return 'js/[name]-[hash].js'
          },
          //assetFileNames: '[ext]/[name]-[hash].[ext]',
          //experimentalMinChunkSize: 20 * 1024, // 单位b 3.3 之后才支持
          //assetFileNames: chunkInfo => {
          //  const chunkName = chunkInfo.name
          //  //const ext = chunkInfo.type
          //  //chunkName?.includes('element-plus') && console.log({ chunkName })
          //  const pathParts = chunkName?.split('/')
          //  const fileName = pathParts?.at(-1) // pathParts?.slice(pathParts.length - 1)
          //  const dotIndex = fileName?.lastIndexOf('.') as number
          //  const ext = fileName?.substring(dotIndex) as string
          //  //console.log({ fileName, ext })
          //  //const [_fileName, ext] = fileName?.split('.')
          //  //const ext = chunkName?.index
          //  //chunkName?.includes('png') && console.log({ fileName })
          //  if (chunkName?.includes('element-plus')) {
          //    return '[ext]/[name].[ext]'
          //  }
          //  if (picExtensions.includes(ext?.toLowerCase())) {
          //    return '[ext]/[name].[ext]'
          //  }
          //  return '[ext]/[name]-[hash].[ext]'
          //},

          // ✅ 手动分包配置
          manualChunks(id) {
            if (id.includes('node_modules')) {
              // 第三方依赖
              const parts = id.split('node_modules')[1].split('/').slice(1)
              let [dep, childDep] = parts
              if (dep.startsWith('@')) {
                //console.log({ dep, childDep, parts })
                dep = `${dep}/${childDep}`
              }
              const result = findDep(dep, separatedModules)
              if (result) return result
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
  }
})

function findDep(dep: string, modules: string[] = []) {
  let i = 0
  while (modules[i]) {
    const module = modules[i]
    //dep.includes('vue') && module === 'vue' && console.log({ dep, module })
    //dep.includes('vue') && module === 'vue-router' && console.log({ dep, module })
    if (module === dep) return module
    // vue 单独打包
    //if (dep === '@vueuse') return 'vueuse'
    if (dep === 'vue-router') return 'vue-router'
    if (dep === 'vue' || dep.startsWith('@vue')) return 'vue'
    const includeDep =
      dep.startsWith(module) ||
      dep.endsWith(module) ||
      dep.startsWith(module, 1) || // @vue/reactivity vue  @dfjs/ec-ui
      module.startsWith(dep) ||
      module.endsWith(dep)
    if (includeDep) return module
    ++i
  }
  return null
}
