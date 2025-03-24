# biome 使用

[biome](https://biomejs.dev/) 是 rome 的继承者，集代**码格式化**、**代码检查**、**代码测试**、代码构建等功能于一身，是一个功能很多的新兴工具，速度极快。

> rome 在 2023 年 9 月份宣布停止维护，biome 是它的继承者，目前开发活跃。

功能特色：

- 格式化和 lint 统一：biome 会自动格式化代码，并且会在格式化的同时进行代码检查，保证代码风格的一致性。
- 性能极快：底层使用 Rust 编写，速度极快。
- 易于使用：配置很少，开箱即用。
- 提示友好：错误提示友好，有详细的错误信息。
- 插件生态丰富：支持插件，可以扩展功能。

和 eslint + prettier 的比较：

| 功能     | biome                | eslint + prettier                       |
| -------- | -------------------- | --------------------------------------- |
| 配置     | 融合                 | 分离，eslint 和 prettier 的配置是分离的 |
| 性能     | 极快                 | 慢                                      |
| 可扩展   | 插件                 | 插件                                    |
| 社区情况 | 快速增长，还不太成熟 | 繁荣，比较成熟了                        |

## biome 初体验

需要 node14.18 以上版本，可以通过 nvm 升级 node 版本。

安装：

```bash
pnpm i -D -E @biome/biome -w # 安装到 workspace
```

## 小结

## 参考

- [Set up a Node.js project with TypeScript and Biome](https://blog.tericcabrel.com/nodejs-typescript-biome/)
- [Biome.js : Prettier+ESLint killer ?](https://walterspieler.dev/blog/biome-js-prettier-eslint-killer)
- [Comparison with OXC #1281](https://github.com/biomejs/biome/discussions/1281)
