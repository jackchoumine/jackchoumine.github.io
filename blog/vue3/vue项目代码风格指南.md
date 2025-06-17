# vue 项目风格指南

团队协作中统一代码风格至关重要，要说有什么具体的理由，以下三点一定能得到很多人的支持：

1. 统一代码风格可有效避免代码合并时的冲突；

2. 保持代码在排版的美观和统一，可缩短理解代码的时间和让协作让加流畅；

3. 统一风格能避免一些公认的代码异味，减少潜在的 bug。

## 命名规范

常用的规范：

| 规范       | 中文         | 别名                         |
| ---------- | ------------ | ---------------------------- |
| camelCase  | 小驼峰命名法 | lowerCamelCase               |
| PascalCase | 帕斯卡命名法 | 大坨峰命名法，UpperCamelCase |
| kebab-case | 短线连接法   | 羊肉串命名法                 |
| snake_case | 下划线命名法 | 蛇形命名法                   |

### 项目文档命名

#### 项目名称

全部小写，多个单词短横线连接，比如`my-project-name`。

使用 create-vue 或者 vite 初始化一个项目时，都采用 id `app` 作为挂载点，要是团队里有成员习惯不好，在 `#app` 选择器下写了样式，后续想要覆盖，就非常困难。所以推荐使用项目的名字最为类，来挂载应用。

> 推荐的实践，把项目名称最为根组件的挂载点，且使用**类名**挂载根组件。

#### 目录结构

目录名全部小写，多个单词使用短线连接。

```bash
public # 不会被 vite 处理静态资源，通过路径直接引用
|---|---styles # 全局样式
|---|---images # 图片，通常放大图，比如背景图
|---|---|---xxx_xxx.png # 多个单词使用 _ 连接
|---|---|---xxx_xxx_min.png # 压缩过的文件，添加 min
|---|---icons # 图标、往往是一些小图片
|---|---|---pdf_icon.png # 多个单词使用 _ 连接
|---|---js # 通过路径直接引用的 js  这里的js文档命名不做特定要求，通常是复制外部的文件
src
|---assets # 需要被 vite 处理的静态资源，处理后路径和文件名发生变化
|---|---styles # 全局样式
|---|---images # 图片，通常放大图，比如背景图
|---|---|---xxx-xxx.png # 多个单词使用 - 连接
|---|---|---xxx-xxx-min.png # 压缩过的文件，添加 min
|---|---icons # 图标、往往是一些小图片
|---|---|---word-icon.png # 多个单词使用 - 连接
|---components # 全项目的通用的基础组件
|---|---EcTable # 放置组件的目录大大写开头，和组件名称一致
|---|---index.ts # 导出组件
|---config # 本项目配置文件
|---|---axios-default.ts # axios默认配置文件
|---|---axios-interceptor.ts # axios请求即响应拦截文件
|---|---global-const.ts # 常量定义文件
|---|---index.ts # 导出接口
|---hooks # 项目通用的 hook
|---|---index.ts # 导出接口
|---plugins # vue 插件 可选
|---|---index.ts # 导出插件
|---router # 路由目录
|---|---routes.ts # 路由配置文件
|---|---index.ts # 导出接口
|---stores # 全局 pinia store
|---|---index.ts # 导出 store
|---utils # 通用工具函数，业务无关，比如格式化数据
|---|---index.ts # 导出 store
|---directives # 全局指令
|---|---index.ts # 导出指令
|---tools # 业务工具函数，业务相关，比如根据 ip 判断环境
|---|---index.ts # 导出函数
|---App.vue # 应用根组件
|---main.ts # 应用入口
|---modules # 模块目录
|---|---commons # 公共模块，可选
|---|---login # 登录模块
|---|---|---assets # 模块资源文件目录，可选
|---|---|---style # 模块内的样式目录，可选
|---|---|---components # 模块组件目录，可选
|---|---|---|---TodList # 放置组件的目录大写
|---|---|---|---index.ts # 导出组件
|---|---|---config #模块配置目录
|---|---|---|---const.ts # 常量
|---|---|---|---index.ts # 导出配置
|---|---|---hooks # 模块内使用的 hook
|---|---|---|---index.ts # 导出 hook
|---|---|---stores #  模块内组件之间共享状态的 store
|---|---|---|---index.ts # 导出 store
|---|---|---types # 模块内类型
|---|---|---|---index.ts # 导出类型
|---|---|---tools # 模块辅助函数，业务相关
|---|---|---|---index.ts # 导出类型
|---|---|---views  # 模块视图目录
|---|---|---[Module].vue # 模块主文件，文件名必须与模块名一致，首字母大写
#|---|---|---utils # 模块内通常没有业务无关的工具函数了
|---types # 类型声明
|---|---global.d.ts # 全局类型声明
```

#### css 文件

全部小写，多个单词使用`-`连接。

```bash
reset.css
input-number.css
```

#### scss 文件

TODO

<!--全部小写，多个单词使用`-`连接。

```bash
reset.css
input-number.css
```-->

#### ts js 文件

全部小写，多个单词使用`-`连接。

```bash
index.ts
action-model.js
```

> 规则的记忆规律：静态文件使用`_`，需要编译的文件使用`-`，components 下放置组件的目录大写。

### vue 文档命名

#### 单文件组件

多个单词，大坨峰命名：

```bash
MyDemo.vue ✅
My.vue ❌️
test.vue ❌️
```

> 禁止使用`index.vue`或者`Index.vue`，可能会引发热更新失效。

> 禁止随意缩写，使用拼音时不得缩写。

```bash
SearchBooks.vue # ✅
SBS.vue # ❌️ 随意缩写
SouSuoShuBen.vue # ok
SSSB.vue # ❌️ 试试设备 实时上报 搜索傻逼 ？ 拼音缩写对应非常多的意思
```

> 单文件组件的文件名称，使用`script setup` 语法时，会最为组件名在 vue 调试面板中展示。

> 使用 option 或者 setup 函数定义组件时，组件名称 name 必须写， 且和文件名一致。原因：方便搜索和调试。

#### tsx jsx 组件

和单文件组件相同。

#### 单例组件

单例组件: 页面只会使用一次的组件，通常没有 props，比如页面顶部导航的组件。

单例组件使用`The`前缀命名，表示器唯一性。

比如这些组件：

```bash
TheNav.vue # 导航组件
TheFooter.vue # 页脚
```

> 如果组件有 props 了，就表明是一个可复用的组件，没必要使用`The`前缀。

#### 基础组件

基础组件：业务独立，能在公司的**不同的项目**直接复用的组件，比如表格、日期选择器等，通常放在`src/components`下，这类组件使用公司命名缩写作为前缀。

比如:

```bash
EcTable.vue # 表格组件
EcFileViewer.vue # 文件预览
```

> 基础组件的特点，可在不同项目中直接复用，不含有业务逻辑，或者含有通用的业务逻辑。

#### 业务组件

包含特定业务功能的组件，根据功能命名即可，多个单词大写开头。

```bash
SearchPOI.vue # 搜索兴趣点
```

#### 组合使用的组件命名

组合到一起才能完成功能的组件，比如`el-table` 和 `el-table-column`，以父组件组件名作为前缀。

比如：

```bash
TodoList.vue
TodoListItem.vue
TodoListInput.vue
```

> 编辑器会把这些组件按照文件名聚拢，方便快速查看。

## 参考

[史上最全 Vue 前端代码风格指南](https://juejin.cn/post/6987349513836953607#heading-8)
