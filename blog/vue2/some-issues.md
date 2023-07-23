# vue2 项目中遇到的问题
1. `Parsing error: No Babel config file detected for xxx`

Either disable config file checking with requireConfigFile: false, or configure Babel so that it can find the config files.

错误提示给出了解决方案，

* 修改 eslint 配置

```js
{
  "parserOptions": {
    "parser": "@babel/eslint-parser",
    "requireConfigFile": false
  }
}
```

这个配置会让 babel 配置失效，不好。

修改 eslint 的查找目录，能解决问题：

```js
{
  // root: true,
  // "root": "./"
  "root": false
}
```

> babel.config.js 必须在项目根目录。.babelrc、.babelrc.js/json 才可以在任意目录。

> eslintrc.js 可以在任意目录，会从根目录开始查找，root 的值只能是true or false，用于指定在根目录找到后是否往下查找。

> 在一个目录里打开多个有 eslint 配置的项目，很可能出现这个问题。

* 或者修改 babel 配置

<!-- 还不知道如何修改 -->

没找修改方案。

参考：

* [eslint 报错：Parsing error: No Babel config file detected?--博客园文章](https://www.cnblogs.com/hmy-666/p/16441069.html)

* [eslint 报错：Parsing error: No Babel config file detected?--思否问题](https://segmentfault.com/q/1010000042063266)
