# pnpm 使用

## 常用命令

```bash
pnpm i package-name
pnpm i package-name -w # 安装到根工作空间
pnpm i package-name -r number # 递归目录安装依赖，number 为递归层数
pnpm i -r 2 # 当前目录和子目录递归安装依赖，递归层数为 2
pnpm i -r 3 # 当前目录和子目录递归安装依赖，递归层数为 3
pnpm i package-name --filter pkg-name # 指定工作空间 pkg-name 的 package.json 的 name 字段

pnpm i mitt -F # 强制安装
pnpm i package-name -D # 安装到开发依赖
pnpm i package-name -P # 安装到生产依赖
pnpm i package-name --save-peer # 安装到peer依赖
pnpm i package-name -g # 全局安装
pnpm i package-name -DW # 安装到根工作空间的开发依赖
pnpm i package-name -DR # 递归安装到所有工作空间的开发依赖

pnpm up package-name # 更新到最新版本

pnpm run --filter script-name # 指定工作空间执行 script-name 命令
pnpm --filter=package-name dev # 指定工作空间执行 dev 命令
```
