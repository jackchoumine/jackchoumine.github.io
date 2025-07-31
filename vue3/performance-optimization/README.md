# performance-optimization

vite 打包优化，希望达到减少打包输出，从而提高加载速到的目的。

可采用如下优化手段：

## 手动分包 -- 不会频繁变动的依赖单独输出

vue、vue-router 和 pinia 等**不会频繁变动**的依赖，手动分包，让他们单独输出，减少`index.js`的大小。

vite 配置：

```js
// 不常变更的依赖独立输出
const separatedModules = ['vue', 'vue-router', 'pinia', 'element-plus', 'lodash-es']

export default defineConfig(({ mode, command }) => {
  console.log({ mode, command })
  return {
    build: {
      rollupOptions: {
        // 默认 html 作为入口
        //input: {
        //  main: path.resolve(__dirname, 'index.html'),
        //},
        output: {
          // 设置输出入口文件名为 main.js
          //entryFileNames: 'js/[name].js',
          //chunkFileNames: 'js/[name]-[hash].js',
          //assetFileNames: '[ext]/[name]-[hash].[ext]',
          entryFileNames: chunkInfo => {
            if (chunkInfo.name === 'main') {
              // 入口文件不加 hash
              return 'js/main.js'
            }
            return 'js/[name]-[hash].js'
          },
          chunkFileNames: chunkInfo => {
            if (['vue', 'vue-router', 'pinia', 'element-plus'].includes(chunkInfo.name)) {
              // 动态分包的 chunk 根据 name 判断是否加 hash
              return `js/${chunkInfo.name}.js`
            }
            return 'js/[name]-[hash].js'
          },
          // 对静态资源进行分类输出
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
              const result = findDep(dep, separatedModules)
              if(result) return result
              return 'vendor' // 其他库统一放这里
            }
          },
        },
      },
    },
  }
})

function findDep(dep: string, modules: string[] = []) {
  let i = 0
  while (modules[i]) {
    const module = modules[i]
    if (module === dep) return module
    const includeDep =
      dep.startsWith(module) ||
      dep.startsWith(module, 1) || // @vue/reactivity vue  @dfjs/ec-ui
      dep.endsWith(module) ||
      module.startsWith(dep) ||
      module.endsWith(dep)
    if (includeDep) return module
    ++i
  }
  return null
}
```

> 不要把 js (通常是 `src/main.*`) 作为打包入口，否则 vite 不会自动处理模板。
