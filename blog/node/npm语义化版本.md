# npm 语义化版本

## 简介

为了在软件版本号中包含更多意义，反映代码所做的修改，产生了语义化版本，软件的使用者能从版本号中推测软件做的修改。npm 包使用语义化版控制，我们可安装一定版本范围的 npm 包，npm 会选择和你指定的版本相**匹配**的 **(latest)最新版本** 安装。

npm 的版本号由三部分组成：
`主版本号` 、 `次版本号` 、 `补丁版本号` 。变更不同的版本号，表示不同的意义：

* 主版本号（major）：软件做了不兼容的变更（breaking change 重大变更）；
* 次版本号（minor）：添加功能或者废弃功能，向下兼容；
* 补丁版本号（patch）：bug 修复，向下兼容。

有时候为了表达更加确切的版本，还会在版本号后面添加**标签**或者**扩展**，来说明是预发布版本或者测试版本等。比如 **3.2.3-beta-3**。

常见的标签有 :
|标签|意义|补充|
|:---:|:---:|:---|
|demo|demo 版本|可能用于验证问题的版本|
|dev|开发版|开发阶段用的，bug 多，体积较大等特点，功能不完善|
|alpha|α 版本|用于内部交流或者测试人员测试|bug 较多|
|beta|测试版(β 版本)|较 α 版本，有较大的改进，但是还是有 bug|
|gamma|（γ）伽马版本|较 α 和 β 版本有很大的改进，与稳定版相差无几，用户可使用|
|trial|试用版本|本软件通常都有时间限制，过期之后用户如果希望继续使用，一般得交纳一定的费用进行注册或购买。有些试用版软件还在功能上做了一定的限制。|
|stable|稳定版||
|csp|内容安装版本|js 库常用|
|latest|最新版本|不指定版本和标签，npm 默认安装最新版|

[更多关于标签的内容](https://docs.npmjs.com/cli/dist-tag)
查看标签：

```bash
npm dist-tags ls <pkg>
```

```bash
npm dist-tags ls vue
```

得到：

```bash
beta: 2.6.0-beta.3
csp: 1.0.28-csp
latest: 2.6.10
```

安装带标签的版本

```bash
npm i <pkg>@<tag>
```

```bash
npm i vue@beta # 安装 2.6.0-beta.3
```

> 希望安装带标签的版本，必须明确指定标签或者版本号，否则安装的是最新的不带标签的版本。

## 版本号变更规则

1. 版本号只升不降，不得在数字前加 0，比如 2.01.2 不允许的；
2. 0.y.z，处于开发阶段的版本；
3. 第一个正式版版本往往命名为 1.0.0；
4. 先行版本必须在补丁版本之后添加，比如 2.3.7-0,- 后面的是先行版本；
5. 版本的比较依次比较**主版本**→**次版本**→**补丁版本**→**先行版本**，直到第一个能得出比较结果为止。
6. 不小心把一个**不兼容的改版**当成了**次版本号**发行了该怎么办？一旦发现自己破坏了语义化版本控制的规范，就要修正这个问题，并**发行一个新的次版本号**来更正这个问题并且恢复向下兼容。即使是这种情况，也不能去修改已发行的版本。

[NPM 版本计算器](https://semver.npmjs.com/)

## 如何处理即将弃用的功能？

弃用现存的功能是软件开发中的家常便饭，也通常是向前发展所必须的。但当你弃用公共 API 的一部分时，你应该做两件事：
（1）更新**文档**以便使用者知道这个变化。
（2）发行不包含弃用功能的**次版本**。在新的主版本中完全移除弃用功能前，至少应有一个包含弃用功能的副版本发布，以便使用者能够平滑过渡到新 API。

如何更新版本号？不用手动修改 package.json。而是用如下命令：

```bash
npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git]
```

1. **newversion**: 直接给一个版本号；
2. **major**:主版本增加 1；
3. **premajor**:预备主版本，主版本增加 1，增加先行版本号；
4. **prelease**:预先发布版本，先行版本号增加 1；

## git 和 npm version 结合

### 手动更改版本号

执行 `npm version <version> -m 'xx %s xx'` 改变 npm 版本的同时，会执行一次 `git commit -m 'xx %s xx'` 并用版本号打一个**tag**，%s 会替换成版本号，前提是版本库是**干净的（clean）**。

### 自动更新版本

在 `.git/hooks` 目录内，新建 `post-commit` , 输入以下内容：

```bash
#!/bin/sh
COMMIT_MSG = "$(git log --pretty=format:" % s " -1 head)"
echo "$COMMIT_MSG" | grep - q "^[0-9]"
if [$ ? -ne 0]; then
# 自动修改 patch
echo $(npm version patch)
fi
```

在执行 `git commit -m 'message'` 后，会检测 message 是否是版本号（y.x.z 的形式），不是，则执行 `npm version patch` 更新补丁版本，打一个 tag。

如果想自动修改 `次版本` ，修改 post-commit 的内容即可。

## 希望发布一个带有测试功能的版本，如何设置版本号？

希望发布一个测试版本，让他人测试：

```bash
npm publish --tag beta
```

发布一个只用一次的版本

```bash
npm publish --tag testing-new-feature
```

希望安装这些带有标签的版本，安装时必须带有标签

```bash
npm i <pkg>@<tag>
```

测试完毕，修改标签

```bash
npm dist-tag --help
npm dist-tag add <pkg>@<version> [<tag>]
npm dist-tag rm <pkg> <tag>
npm dist-tag ls [<pkg>] # alias: dist-tags
```

## 版本运算符

版本运算符指定了一定范围的版本。主要有**~**、**^**、**-**、**<**、**<=**、**>**、**>=**、**=**版本运算符。

### ~ 版本号 ----- 指定主版本号或者次版本号相同

~ + **只含主版本** --- 主版本相同；
~ + **含有次版本** --- 主版本和次版本号相同。
|版本范围|匹配版本|
|:----------:|:---------:|
|~3|3.x 或者 3.0.0 <= v < 4.0.0|
|~3.1|3.1.x 或者 3.1.0 <= v < 3.2.0|
|~3.1.2|3.1.2 < v < 3.2.0|

指定的版本范围含有预发布版本，只会匹配和完整版本号相同的预发布版本。
~3.1.3-beta.2 匹配 3.1.3-beat.3 不匹配 3.1.4-beat-2

```bash
npm i lodash@~3 # 安装 3.10.1
npm i lodash@~3.9 # 安装 3.9.3
npm i lodash@~3.9.1 # 安装 3.9.3
npm i lodash@~3.8.0 # 安装 3.8.0
```

### ^ 版本号 --- 第一个*非零* 版本号相同

| 版本范围 |      匹配版本      |             补充              |
| :------: | :----------------: | :---------------------------: |
|  ^3.1.5  | 3.1.5 <= v < 4.0.0 |
|  ^0.3.6  | 0.3.6 <= v < 0.4.0 |
|  ^0.0.2  | 0.0.2 <= v < 0.0.3 |
|  ^3.x.x  | 3.0.0 <= v < 4.0.0 | 版本号缺少的位置，会被 0 填充 |
|  ^4.2.x  | 4.2.0 <= v < 4.3.0 |                               |

npm 安装包时，默认使用 ^ 匹配版本。

安装主版本号为 3 的最新版本：

```bash
npm i lodash@^3 # 安装 3.10.1
npm i lodash@^3.9 # 安装 3.10.1
npm i lodash@^3.8.0 # 安装 3.10.1
```

### ~ vs ^

| 版本范围 |     含义      |     匹配的版本     | 说明               |
| :------: | :-----------: | :----------------: | ------------------ |
|  ~3.3.0  | 与 3.3.0 相似 | 3.3.0 <= v < 3.4.0 | 主版本和次版本相同 |
|  ^3.3.0  | 与 3.3.0 兼容 |   3.3.0 <= v < 4   | 主版本相同         |

同一个版本号，^ 能匹配的范围大些，更加激进。
例子

```bash
npm i lodash@^3.3.0 # 安装 3.10.1
npm i lodash@~3.3.0 # 安装 3.3.1
```

**~** 和 ≈ 差不多，可将 ~ 理解成**相似**，这样就区别和理解了，~ 指定的是**相似版本**。

**^** 可理解成**兼容版本**。

### 如何优雅地按照版本范围升级依赖

`npm outdated` 可以检查过时的依赖，然后使用 `npm up` 升级。

更加推荐使用[npm-check-updates](https://www.npmjs.com/package/npm-check-updates)按需升级依赖。

安装 `npm i npm-check-updates -g`

基础使用

```bash
ncu # 检查更新，在结果中以不同的颜色显著显示版本变化
nuc -u # 升级所有包
ncu -u packageName packageName # 升级指定包
ncu -u -f node-fetch # 同上
ncu react-* # 升级一类包
ncu -x nodemon # 除了 nodemon 不升级，其他都升级
ncu -u -t patch # 升级补丁版本变化的包
ncu -u -t minor
```

> package.json 改变后，重新 npm i，然后确保项目运行正确，再提交 git

### - 指定精确范围

|   版本范围    |      匹配版本       |          补充           |
| :-----------: | :-----------------: | :---------------------: |
| 2.0.0 - 3.2.7 | 2.0.0 <= v <= 3.2.7 |      - 前后有空格       |
|    0.4 - 3    | 0.4.0 <= v <= 3.0.0 | 缺少的版本号，被 0 填充 |

```bash
npm i vue@"1 - 1.9" # 安装 1.0.28
```

> 该使用哪种版本呢？

npm 默认使用 `^` ，我们可以修改：

```bash
npm config set save-prefix="~" # 使用 ~
npm config set save-exact true # 使用精确版本
```

### 版本号比较器

| 版本范围 |       匹配版本        | 补充 |
| :------: | :-------------------: | :--: |
|  <2.2.0  |   小于 2.2.0 的版本   |      |
| <=2.0.0  | 小于等于 2.0.0 的版本 |
| \>4.2.0  |   大于 4.2.0 的版本   |
| \>=4.2.0 | 大于等于 4.2.0 的版本 |
|  =4.3.0  |   等于 4.3.0 的版本   |

```bash
npm i lodash@\<3.5 # 安装 3.4.0
npm i lodash@\<=3.5 # 安装 3.5.0
npm i lodash@\>3.5 # 安装 4.17.11
npm i lodash@\>=3.5 # 安装 4.17.11
npm i vue@">1 <2.3" # 安装 2.2.6
```

> \ 是转义字符。

### 分组 || (几乎不用)

|   版本范围   |                  匹配版本                   |
| :----------: | :-----------------------------------------: |
| ~2 \|\| ^0.7 | 匹配 2.0.2<= v < 3.0.0 或者 0.7 <= v <1.0.0 |

```bash
npm i vue@"^0.7 || ~2" # 安装 2.6.10 最新的版本
```

> 其它

`*` 或者 `''` 匹配任何版本，不推荐这样做。

## 参考

[依赖的版本](https://yarnpkg.com/lang/zh-hans/docs/dependency-versions/)

[版本号管理策略&&使用 npm 管理项目版本号](http://buzhundong.com/post/%E7%89%88%E6%9C%AC%E5%8F%B7%E7%AE%A1%E7%90%86%E7%AD%96%E7%95%A5-%E4%BD%BF%E7%94%A8npm%E7%AE%A1%E7%90%86%E9%A1%B9%E7%9B%AE%E7%89%88%E6%9C%AC%E5%8F%B7.html)

[语义化版本 2.0](https://semver.org/lang/zh-TW/#%E5%9C%A8-0yz-%E5%88%9D%E5%A7%8B%E9%96%8B%E7%99%BC%E9%9A%8E%E6%AE%B5%E6%88%91%E8%A9%B2%E5%A6%82%E4%BD%95%E9%80%B2%E8%A1%8C%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6)

[whats-the-difference-between-tilde-and-caret-in-package-json](https://stackoverflow.com/questions/22343224/whats-the-difference-between-tilde-and-caret-in-package-json)

[npm 发包最佳实践](https://github.com/canvasT/blog/issues/2)
