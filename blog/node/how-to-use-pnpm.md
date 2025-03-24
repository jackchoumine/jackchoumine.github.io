# pnpm 使用

## 常用命令

```bash
pnpm i package-name
pnpm i package-name -w # 安装到根工作空间
pnpm i package-name --workspace # 从本地工作目录安装子包
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

## 关于链接

ln 是 Linux 系统中用于创建文件链接的命令。它有以下主要功能和特点:

1. ln 命令可以创建硬链接和软链接(符号链接)两种类型的链接。

2. 软链接(使用 ln -s 创建)类似于 Windows 中的快捷方式,只是指向源文件的路径,不占用额外磁盘空间。

3. 硬链接(不使用 -s 选项)创建与源文件具有相同 inode 的副本,看起来像独立文件但实际共享同一份数据。

4. ln 命令会保持每一处链接文件的同步性,无论修改哪个链接,其他链接都会反映相同的变化。

5. 软链接可以跨文件系统,可以链接到目录,也可以链接到不存在的文件。

6. 硬链接只能在同一文件系统内创建,不能用于目录。

7. 基本语法为:ln [选项] 源文件 目标文件。

8. 常用选项包括 -s (创建软链接)、-f (强制执行)、-i (交互模式) 等。

> ln 命令在 Linux 系统管理中非常有用, 可以有效节省磁盘空间并方便文件的共享和访问。

### Linux文件链接分为软链接和硬链接，两者有什么区别？

Linux中的符号链接，就是我们平时说的软连接，可以针对文件、目录创建，但是源文件删除后链接不可用，命令: `ln -s xxx xxx`

Linux中的硬链接，只能针对文件，但是文件删除仍可使用，命令: `ln xxx xxx`

## pnpm + workspaces 搭建 monorepo 项目

### 什么是 monorepo

monorepo 是指在一个仓库中管理多个项目，这些项目之间可能有依赖关系，也可能没有。Monorepo 项目的好处是可以统一管理依赖，方便代码复用和维护。
pnpm 提供了 workspaces 功能，可以很方便地搭建 monorepo 项目。

### 搭建 monorepo 项目

1. 创建一个空目录，进入该目录，执行 `pnpm init -y` 初始化项目。

2. 在项目根目录下创建 packages 目录，用于存放子项目。

3. 在 packages 目录下创建子项目目录，每个子项目目录都是一个独立的项目。

4. 在项目根目录下创建 package.json 文件，配置 workspaces 字段，指定子项目目录。

5. 在项目根目录下执行 `pnpm i` 安装依赖。

6. 在子项目目录下执行 `pnpm i` 安装依赖。

7. 在子项目目录下执行 `pnpm run dev` 启动项目。

8. 在项目根目录下执行 `pnpm run dev` 启动所有子项目。

### workspaces 配置

```json
{
  "workspaces": ["packages/*"]
}
```
