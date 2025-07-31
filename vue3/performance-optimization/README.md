# performance-optimization

vite 打包优化，希望达到减少打包输出，从而提高加载速到的目的。

可采用如下优化手段：

## 分析哪些文件过大

<!-- TODO -->

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

> 为何手动分割后，总的打包输出反而变大了？

## 按需加载 - 组件库、工具库能按需加载的都按需加载

### 按需导入组件库的组件

### 使用支持 ESM 的工具库

### 异步组件

### 动态导入

## 压缩资源

### vite 打包输出压缩

> js 压缩

> 如何压缩位于 public 下直接引入的 js 呢？

> js 移除不必要的日志

> css 压缩

> html 压缩

### 图片压缩

> 直接使用压缩后的图片

使用 [tinypng](https://tinypng.com/) 压缩图片后再放入项目。

任何目录下的图片都可压缩后放入项目，尤其是 public 目录下的图片，不经过 vite 处理，推荐先压缩再放入。

> 使用插件压缩图片

## 参考

[vite打包性能优化以及填坑](https://juejin.cn/post/7232688124416458789)

[Vite打包优化基本操作](https://note.bingkele.cc/content/docs/24)

[vue代码优化方案](https://jackchoumine.github.io/vue3/vue%E4%BB%A3%E7%A0%81%E4%BC%98%E5%8C%96%E6%96%B9%E6%A1%88.html)
