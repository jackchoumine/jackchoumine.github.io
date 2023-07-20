# vue3 中的 jsx

## 哪些场景写 jsx 更加优雅

1. 一个文件多个导出

比如将复合组件的所有组成组件写在一个文件。

2. 希望充分使用 js 的编程能力

比如翻转模板、优化模板中冗余的指令。

3. 泛型组件

```ts
export interface Props<T> {
  data?: T[]
  keys?: keyof T
}
export const Foo = <T extends { a?: string }>(props: Props<T>) => {
  return <Bar {...props}></Bar>
}
```

![更好的类型提示](https://tva1.sinaimg.cn/large/008i3skNgy1gw3k8me20uj317k076759.jpg)

4. 希望更好的运行时类型检查

## jsx 需要注意哪些

1. props 是合并还是覆盖？

合并

2. 如何处理插槽？

default vs children vs 其他插槽 f
