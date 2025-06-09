# vue3-demos

## 给全局对象 window 添加额外的属性类型

> 1. `types/global.d.ts` 文件中添加了对 `window` 对象的类型扩展。

```ts
declare global {
  interface Window {
    myGlobalFn: () => void
    age: number
  }
}

// 确保文件是一个模块文件,export {} 不导出任何内容
// 只要文件中有 import 或 export，它就会被 TypeScript 识别为“模块文件”。
export {}
```

没有 `export {}` 的话，TypeScript 会将这个文件视为全局脚本文件，而不是模块文件，这可能会导致类型定义不被正确识别。

扩展全局对象，必须使用 `declare global` 语句。

> 2. 在 `tsconfig.app.json` 纳入 types/global.d.ts。

```json
{
  "include": ["env.d.ts", "src/**/*", "src/**/*.vue", "types"]
}
```

完成以上步骤后，window.age 就有类型提示了。
