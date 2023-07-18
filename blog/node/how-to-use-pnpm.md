# pnpm 使用

## 常用命令

```bash
pnpm i package-name
pnpm i package-name -w # 安装到根工作空间
pnpm i package-name -r number # 递归目录安装依赖，number 为递归层数
pnpm i -r 2 # 当前目录和子目录递归安装依赖，递归层数为 2
pnpm i -r 3 # 当前目录和子目录递归安装依赖，递归层数为 3

pnpm i package-name -D # 安装到开发依赖
pnpm i package-name -P # 安装到生产依赖
pnpm i package-name --save-peer # 安装到peer依赖
pnpm i package-name -g # 全局安装
pnpm i package-name -w -D # 安装到根工作空间的开发依赖
pnpm i package-name -F # 强制安装

pnpm up package-name # 更新到最新版本

pnpm i package-name --filter pkg-name # 指定工作空间 pkg-name 的 package.json 的 name 字段
pnpm --filter pkg-name dev # 指定工作空间执行 dev 命令
```
