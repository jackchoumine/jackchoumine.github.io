# JSDoc 代替 TypeScript 语法

> 翻译文章：[JSDoc as an alternative TypeScript syntax](https://alexharri.com/blog/jsdoc-as-an-alternative-typescript-syntax)

想要在 web 开发中采用静态类型的语言，TypeScript 已经成为默认的首选。这很棒，我喜欢 TypeScript。但是不能使用 ts 怎么办呢？无论是工具约束还是不喜欢静态类型的团队，都可能遇到需要纯 js 的情况。这时候，JSDoc 就是一个很好的选择。

```js
/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function add(a, b) {
  return a + b
}
```

当我得到 ts 编译器能理解 JSDoc 时，我是很惊讶的。这就允许你不使用 ts，但仍然可以给代码库添加类型支持。本文可作为使用 JSDoc 代替 ts 类型标注的速成课，将会介绍如何使用 JSDoc 代替重要的 ts 功能，以及 JSDoc 的局限。

## JSDoc

JSDoc 是一种注释风格，用于描述 JavaScript 代码的 API。它是一种标准，被广泛用于 JavaScript 代码库中。JSDoc 注释以 `/**` 开头，以 `*/` 结尾，可能包含标记块，比如 `@param` 。JSDoc 注释可以包含多行，以及一些特殊的标签，用于描述函数、类、变量等。

```js
// @type {number}
let a; // Doesn't work

/* @type {number} */
let b; // Doesn't work

/*** @type {number} */
let c; // Doesn't work

/** @type {number} */
let d; // Works!
```

大多数JSDoc标记块用于标记 `变量` 、 `参数` 和 `返回类型` 。 `@type` 用于标记变量， `@param` 用于标记参数， `@returns` 用于标记返回类型。

```js
/**
 * @param {string} message
 * @returns {number}
 */
function len(message) {
  return message.length
}

/**
 * @type {{name:string,age:number}}
 */
const user = {
  name: 'Alex',
  age: 26,
}
```
ts 中常见诸如类型转换、常量断言等如何在JSDoc中实现呢？下面我们来看看。

### 类型转换

ts 中类型转换可使用 `expression as T` 或者 `<T> expression`：

```ts
function example(arg:unknown){
  const num = arg as number
  const str = <string>arg
}
```

>JSDoc 类型转换 -- `/**type {T} */(expression)`：

```js
```
