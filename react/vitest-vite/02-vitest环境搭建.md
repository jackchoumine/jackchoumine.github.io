# vitest + vite + ts 环境搭建

使用 vite 搭建 vitest node 运行环境。

为何使用 vite?

> vitest 旨在将自己定位为 vite 项目的首选测试框架，即使对于不使用 vite 的项目也是一个可靠的替代方案。

## 创建一个 ts 项目

```bash
npm create vite@latest # 选择 Vanilla  + ts 就行了
```

创建成功后，然后安装依赖，执行`npm run dev` 检查环境是否配置好了。

为了拿到代码后能成功运行，把依赖的版本锁定。

根目录下，创建 `.npmrc`:

```bash
# save-exact 的优先级更加高
 save-exact=true
# 相似版本
#save-prefix=~
# 从淘宝镜像下载
registry=https://registry.npmmirror.com
```

## 搭建 vitest 环境

安装依赖

```bash
npm i vitest -D # 此时 vitest 的版本为 3.1.1
```

创建一个 sum 验证环境是否就绪：

`src/utils/sum.ts`:

```ts
export function sum(...args: number[]) {
  return args.reduce((total, cur) => total + cur, 0)
}
```

sum 的单元测试：`src/utils/sum.test.ts`:

```ts
import { describe, expect, it } from 'vitest'

import { sum } from './sum'

describe('sum 求和函数', () => {
  it('sum(1,2)', () => {
    expect(sum(1, 2)).toBe(3)
  })
})
```

执行`npx vitest`，验证环境是否就绪。

控制台输出没有任何异常，表示环境都搭建好了。

现在把 vitest 加入 package.json 的脚本中，后续执行。

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest"
  }
}
```

> 每新增一种或者修改一次配置，都验证一下配置是否正常工作，确保正常工作后，再进行其他改动。这种验证叫可用性测试。

> 可用性测试，每次改动都验证一次，小步进行，要是哪次改动导致环境不可用，能快速定位是哪次修改引发的。

到这里，vitest + vite 环境就搭建完成了。

## 如何进行调试

<!-- TODO -->

## 小结

- 依赖使用精确版本，方便他人拿到代码，能顺利运行，通过`.npmrc`能执行依赖安装哪个版本；
- 每次修改环境配置，都进行一次可用性测试，确保环境正常工作了，再进行下一个修改，能避免改动太大难以确定问题。
