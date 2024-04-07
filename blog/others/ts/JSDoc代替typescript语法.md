# JSDoc 代替 TypeScript 语法

> 主要翻译[JSDoc as an alternative TypeScript syntax](https://alexharri.com/blog/jsdoc-as-an-alternative-typescript-syntax)，加入一些个人理解。

想要在 web 开发中采用静态类型的语言，TypeScript 已经成为默认的首选。这很棒，我喜欢 TypeScript。但是不能使用 ts 怎么办呢？无论是工具约束还是不喜欢静态类型的团队，都可能遇到需要纯 js 的情况。这时候，JSDoc 就是一个很好的选择。

```js
/**
 * @param {number} a
 * @param {number} [b]
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

大多数 JSDoc 标记块用于标记 `变量` 、 `参数` 和 `返回类型` 。 `@type` 用于标记变量， `@param` 用于标记参数， `@returns` 用于标记返回类型。

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

ts 中常见诸如类型转换、常量断言等如何在 JSDoc 中实现呢？下面我们来看看。

### 类型转换

ts 中类型转换可使用 `expression as T` 或者 `<T> expression` ：

```ts
function example(arg:unknown){
  const num = arg as number
  const str = <string>arg
}
```

> JSDoc 类型转换 -- `/**type {T} */(expression)` ：
> 表达式的括号是必须的。

```js
/**
 * @param {unknown} arg
 */
function example(arg) {
  const num = /** @type {number} */ (arg)
  return num + 1
}
```

> 常量断言

ts 常用断言

```ts
function resize(options: { size: 1 | 2 }) {
  // ...
}

const a = { size: 1 as const }
const b = { size: 2 }

resize(a) // OK
// Error: Types of property 'size' are incompatible.Type 'number' is not assignable to type '1 | 2'.
resize(b)
```

JSDoc 中使用 const 断言，只是一种类型转换

```js
/**
 * @param {{ size: 1 | 2 }} options
 */
function resize(options) {
  // ...
}

const a = {
  size: /** @type {const} */ (1)
}
const b = {
  size: 2
}

resize(a) // OK
resize(b)
```

> 类型声明

ts 中使用 `type` 和 `interface` 声明类型

```ts
type Value = string | number;

interface Store {
  value: Value;
  set(value: Value): void;
}
```

JSDoc 中使用 `@typedef` 声明类型

```js
/**
 * @typedef {string|number} Value
 */

/**
 * @typedef {{value:Value,set(value:Value):void}} Store
 */

// 使用类型
/**
 * @type {Store}
 */
const store = {
  value: 1,
  set(value) {
    this.value = value
  },
}
```

> 对象类型可使用 `@property` 声明属性

```js
/**
 * @typedef {string|number} Value
 */

/**
 * @typedef {object} Store
 * @property {Value} value
 * @property {(value: Value) => void} set
 */

/**
 * @type {Store}
 */
const store = {
  value: 1,
  set(value) {
    this.value = value
  },
}
```

深层对象使用 `.` 声明深层属性

```js
/**
 * @typedef {object} User
 * @property {object} name
 * @property {string} name.first
 * @property {string} name.last
 */

/**
 * @type {User}
 */
const user = {
  name: {
    first: 'John',
    last: 'Doe',
  },
}
```

> 导出类型

JSDoc 没有导出类型的语法。用 `@typedef` 在**模块顶层**声明的类型，会被自动导出。

```js
// User 类型自动导出
/**
 * @typedef {object} User
 * @property {object} name
 * @property {string} name.first
 * @property {string} name.last
 */
/**
 * @typedef {string|number} Value
 */

if (!autoExport) {
  // Store 不会自动导出
  /**
   * @typedef {object} Store
   * @property {Value} value
   * @property {(value: Value) => void} set
   */

  /**
   * @type {Store}
   */
  const store = {
    value: 1,
    set(value) {
      this.value = value
    },
  }
}

function example() {
  // Bar 不会自动导出，在函数内声明
  /**
   * @typedef {string|number} Bar
   */
}
```

> 导入类型

ts 中使用 `import` 导入类型

```ts
import {Foo} from './foo'
import type {Foo} from './foo'
import {type Foo} from './foo'
let foo:import('./foo').Foo
```

JSDoc 只允许使用 `import('./path')` 导入类型

```js
/**
 * @typedef {import('./test').User} User
 */

/**
 * @type {User}
 */
let foo = {
  name: {
    first: 'name',
    last: 'last',
  },
}

/**
 * @type {import('./test').Store}
 */
let bar = {
  value: 1,
  set(value) {
    this.value = value
  },
}
```

使用 `@typedef` 导入类型，会再次导出。

> 可选参数和可选属性 -- 使用 `[]` 包裹可选参数和属性

```js
/**
 *
 * @param {number} a
 * @param {number} [b]
 * @returns {number}
 */
function sum(a, b) {
  return a + (b ?? 10)
}
```

> 参数默认值 -- 使用 `=` 设置默认值

```js
/**
 *
 * @param {number} a - The first number.
 * @param {number} [b=10] - The second number，default 10.
 * @returns {number}
 */
function sum(a, b = 10) {
  return a + b
}
```

```js
/**
 * @typedef {object} User
 * @property {object} name
 * @property {string} name.first
 * @property {string} [name.last] // 可选属性
 */
```

> 泛型 -- 使用 `@template` 声明泛型

```js
/**
 * @template T
 * @param {T} value
 * @returns {{value:T}}
 */
function box(value) {
  return {
    value
  }
}
```

等同于 ts 中的

```ts
function box<T>(value: T): { value: T } {
  return { value }
}
```

> 类型约束

```js
/**
 * @template {string|number} T
 * @param {T} value
 * @returns {{value:T}}
 */
function box(value) {
  return {
    value
  }
}
```

等同于 ts 中的

```ts
function box<T extends string | number>(value: T): { value: T } {
  return { value }
}
```

`@template` 块标记还可用于类型定义、类、方法等。

```js
// Declaring a generic type
/**
 * @template T
 * @typedef {{ value: T }} Box
 */

// Referencing a generic type
/** @type {Box<number>} */
const box = {
  value: 5
}

// Creating a generic class
/**
 * @template T
 */
class Box {
  /**
   * @param {T} value
   */
  constructor(value) {
    this.value = value
  }
}
```

> 接口的实现

ts 中使用 `implements` 实现接口

```ts
interface IUser {
  name: string
}
class User implements IUser {
 //
}
```

JSDoc 中使用 `@implements` 实现接口

```js
/**
 * @typedef {object} IUser
 * @property {string} name
 */
/**
 * @implements {IUser}
 */
class User {
  //
}
```

> 共有和私有 - `@public` 和 `@private`

```js
class Example {
  /**
   * @public
   * @type {number}
   */
  age;
  /**
   * @private
   * @type {string}
   */
  name;
}
```

> this -- `@this`

```ts
interface Context {
  name: string
}
// this 放在一个参数位置，是假的参数
function fooYou(this: Context, value: number) {
  console.log(this.name, value)
}
```

JSDoc 中使用 `@this`

```js
/**
 * @typedef {{name:string}} Context
 */
/**
 * @this {Context}
 * @param {number} value
 */
function fooYou(value) {
  console.log(this.name, value)
}
```

## js 和 ts 一起使用

`checkJs` 选项允许在 js 文件中检查类型

```json
// tsconfig.json
{
  "compilerOptions": {
    "checkJs": true // 开启 js 文件中类型检查
    // "checkJs": false // 不启 js 文件中类型检查，仅用于编辑器类型提示
  }
}
```

通常， `.ts` 和使用了 JSDoc 的 `.js` 文件一起使用，是没有问题的。

> 不能使用 `JSDoc` 用于 `.ts` 文件。

## 局限

声明回调函数类型和非空判断，JSDoc 没有很好的办法。

## 小结

1. 介绍了如何使用 JSDoc 代替 ts 的类型标注。
2. 使用了 JSDoc 的 js 和 ts 文件可以一起使用。
