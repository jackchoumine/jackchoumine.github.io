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

> 使用 `null`

1. 一个对象稍才有确定的值，可以将初始化值设置为`null`。这样做的好好处，是的变量的类型一致。
2. 释放对象的内存，使用`null`。
3. 不希望`JSON.stringify`时属性被删除。

> 使用 `undefined`

1. 一个变量不确定其类型，可将初始化值设置为`undefined`。
3. 希望触发函数默认值和对象默认属性。

```JS
const {
  a = 'a'
} = {
  a: undefined
}
// 默认值 a 生效 

const {
  b = 'b'
} = {
  b: null
}
// b 的默认值不生效
```

## 参考

[We don't need null](https://luke.sh/articles/we-don-t-need-null)
