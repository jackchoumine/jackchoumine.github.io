# 你知道 npmrc 文档吗？ ---- npmrc 关键作用介绍

`.npmrc` 是 npm 的配置文件。rc 是 registry config 缩写。

npm 在执行命令时，会读取里面的配置，然后执行特定的行为，通过它可改变 npm 的默认行为，比如下载精确版本的 npm 包，从某个 npm 源的下载依赖等。

有*4*种 `.npmrc` 文件，npm 会依次读取这些文件，后面的文件会覆盖前面的文件的配置。

1. 项目级别的 `.npmrc` 文件，在 `package.json` 文件所在的目录。
2. 用户级别的 `.npmrc` 文件，在用户的根目录。通过 `npm config get userconfig` 查看。
3. 全局级别的 `.npmrc` 文件, 在 npm 的安装目录下。通过 `npm config get globalconfig` 查看。
4. 内置的 `.npmrc` 文件，npm 自带的配置文件，无法修改，基本不会用到。

> 主要关注项目级别的 `.npmrc` 文件和用户级别的 `.npmrc` 文件。

一个典型的配置：

```bash
# save-exact 的优先级更加高
# save-exact=true
# 相似版本
save-prefix=~
# 从淘宝镜像下载
registry=https://registry.npmmirror.com
# 指定 node-sass 镜像 提高下载速度
sass_binary_site=https://npmmirror.com/mirrors/node-sass
electron_mirror=https://npmmirror.com/mirrors/electron/
electron_builder_binaries_mirror=https://npmmirror.com/mirrors/electron-builder-binaries/
# 详细日志 常用于调试
loglevel=verbose
```

> 从**命令行传递的参数**优先级最高，然后是项目级别的配置，然后是用户级别的配置，最后是全局级别的配置。

> 编码务必使用 UTF-8 编码，否则可能不会读取配置。

> `#` 或者 `;` 表示注释。

## 如何修改配置呢？

```bash
npm config set [key] [value] [-g] # -g 全局配置
npm config set save-prefix ^
npm config set registry https://registry.npmmirror.com/

npm config get [key] # 查看配置
npm config get cache # 查看缓存目录
npm config list -l # 查看本地配置
npm config list -g # 全局配置
npm config list -u # 用户配置
```

## 日常开放常常需要置哪些信息呢？

### registry 信息

npm 的源，可以是官方源，也可以是第三方源，比如淘宝源，或者公司的私有源。

```bash
# 官方源
registry=https://registry.npmjs.org/
# 淘宝源
# registry=https://registry.npmmirror.com/
```

### 配置限定包

```bash
@myscope:registry=https://mycustomregistry.example.org
```

### 认知信息

当使用私有的 npm 源时，可能需要认证信息。

> 注意认证信息的应用范围，源和认证信息不对应，可能导致404。

```bash
# bad config
@myorg:registry=https://somewhere-else.com/myorg
@another:registry=https://somewhere-else.com/another
# _authToken 将应用到 @myorg 和 @another 两个源上
//somewhere-else.com/:_authToken=MYTOKEN
# 只应用到 @myorg 上
//somewhere-else.com/myorg/:_authToken=MYTOKEN1
# 只应用到 @another 上
//somewhere-else.com/another/:_authToken=MYTOKEN2

# 从 gitlab 的私有仓库下载依赖
@jackzhoumine:registry=https://gitlab.com/api/v4/projects/54539895/packages/npm/
//gitlab.com/api/v4/projects/54539895/packages/npm/:_authToken=glpat-3759QXSo9Pz9FxGe12324
```

可通过这些信息认证：

```bash
_auth  # (base64 authentication string)
_authToken  #(authentication token)
username
_password
email
certfile # (path to certificate file)
keyfile # (path to key file)
```

> 通过 `npm login` 登录，会自动添加认证信息。

> 认证信息是敏感信息，不要提交到代码仓库。

> 不能配置多个源和对多个源的认证信息。

### 代理配置

```bash
proxy=http://username:password@proxy-server-address:port
https-proxy=https://username:password@proxy-server-address:port
```

### 缓存配置

配置 node 依赖的缓存。

```bash
cache=your/path/to/cache
```

### 安装行为

比如默认安装的时候，是否保存精确版本，依赖信息是否保存到 `package.json` 文件等。

```bash
# 相似版本
save-prefix=~
```

## 参考

* [npm-npmrc](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc)
* [What is a .npmrc file?](https://medium.com/@pmmanav/what-is-a-npmrc-file-e7bd40bff3f0)
* [深入了解npmrc：使用与配置指南](https://zhuanlan.zhihu.com/p/651477901)
