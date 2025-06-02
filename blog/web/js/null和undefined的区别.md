# null 和 undefined 的区别

## 相同点

都是假值。

## 不同点

### undefined

1. `undefined` 表示一个变量已经声明但是未初始化；
2. 一个对象上不存在的属性，未定义`not defined`；
3. 存在这个属性，值为`undefined`；
4. 转成数值时为`NaN`。
5. `undefined`会触发函数默认值和对象解构时的默认属性。

```JS
const obj = {
  a: undefined,
}

console.log(obj.a) // undefined
console.log(obj.hasOwnProperty('a')) // true
console.log(obj.b) // undefined
console.log(obj.hasOwnProperty('b')) // false
let c
console.log(c) // undefined
```

> 如何区分是不存在属性还是属性值为 `undefined` ，使用 `obj.hasOwnProperty('b')` 。

> `undefined` 是 js 中一个特殊的全局变量和一个特殊的类型，可被重置，这点是语言设计失误。

> `JSON.stringify` 会删除值为 `undefined` 的属性。

### null

1. 表示一个变量被明确赋值为`null`，一个特殊值。
2. 表示一个变量为对象，其值为`null`，表示没有值，一般用于释放对象的内存。
3. 转成数值时为`0`。
4. 不会触发函数默认值和对象默认属性。

## 该如何选择呢？

这个问题争论挺大的，有人主张使用 `null` ，有人主张使用 `undefined` ，一些人没意见，都使用。

> 主张使用 `null` 的常见理由

1. `null`语义更加明确。
2. 方便前后端通信：对象中包含`null`值的属性，序列化后不会丢失，能提交到服务器，http 接口也能返回包含 null 的数据，比如 Java 后台。
3. `undefined` 是一个可被重置的全局变量。

> 主张使用 `undefined` 的常见理由

1. 它是 js 内置的变量的默认值，给函数参数，解构，空数组等用法带来方便。
2. 能使 http 接口返回更小，因为值为`undefined`的属性被过滤了，比如使用 node 做后台。

```js
const {
  a = 'a'
  b = 1
  c = 'I am c'
} = {
  a: undefined,
  c: null
}
// a b 的默认值生效，c 不生效
```

我更加偏向使用 `undefined` ，只有几种场景使用 `null` :

`undefined` 给对象解构和默认参数等 js 用法带来极大方便，简化代码。

1. 对象序列化，希望不丢失属性。
2. js 中无法避免的情况，比如正则匹配、获取 localStorage 中保存的数据。
3. 调用后台给的接口时，比如 Java 后台。

## 如何在代码中禁用 null?

可使用 eslint 插件 [eslint-plugin-no-null](https://www.npmjs.com/package/eslint-plugin-no-null)，禁用 null。

```js
{
  "plugins": [
    "no-null"
  ],
  "rules": {
    "no-null/no-null": 2
  }
}
```

## 参考

[We don't need null](https://luke.sh/articles/we-don-t-need-null)
