# 常用的 js 代码片段

## 1. 不使用临时变量交换两个变量

```js
let a = 1;
let b = 2;
[a, b] = [b, a];
```

## 2. 浅克隆对象

```js
const obj = {
  a: 1,
  b: 2
};
const clone = {
  ...obj
};
```

## 3. 合并对象

```js
const obj1 = {
  name: '张三'
};
const obj2 = {
  age: 22
};

const mergedObj = {
  ...obj1,
  ...obj2
};
```

## 3. 过滤数组中的假值

```js
const arr = [0, 1, 2, 3, false, '', null, undefined, NaN];
const filtered = arr.filter(Boolean);
```

## 5. NodeList 转换为数组

```js
const nodeList = document.querySelectorAll('div');
const divList = Array.from(nodeList);
// or
const divList = [...nodeList];
```

## 6. 数组去重

```js
const arr = [1, 2, 3, 3, 4, 4, 5];
const uniqueArr = [...new Set(arr)];
```

## 7. 两数组的交集

```js
const arr1 = [1, 2, 3, 4];
const arr2 = [3, 4, 5, 6];
const intersection = arr1.filter(item => arr2.includes(item));
```

## 8. 两数组的差集

```js
const arr1 = [1, 2, 3, 4];
const arr2 = [3, 4, 5, 6];
const difference = arr1.concat(arr2).filter(v => !arr1.includes(v) || !arr2.includes(v));
```

## 9. 两数组的并集

```js
const arr1 = [1, 2, 3, 4];
const arr2 = [3, 4, 5, 6];
const union = [...new Set([...arr1, ...arr2])];
```

## 10. 数组求和

```js
const arr = [1, 2, 3, 4, 5];
const sum = arr.reduce((acc, cur) => acc + cur, 0);
```

## 11. 对象数组指定属性求和

```js
const arr = [{
    name: '张三',
    age: 22
  },
  {
    name: '李四',
    age: 23
  },
  {
    name: '王五',
    age: 24
  }
];

function sumBy(arr, key) {
  return arr.reduce((acc, cur) => acc + cur[key], 0);
}
```

## 12. 对象的计算属性

```js
const key = 'name';
const obj = {
  [key]: '张三'
};
```

> 函数调用可作为计算属性吗？

## 13. 检查联网状态

```js
const isOnline = window.navigator.onLine;
```

## 14. URL 的查询参数转对象

```js
const search = '?name=张三&age=22'; // window.location.search 或者 new URL(url).search
const params = Object.fromEntries(new URLSearchParams(search));
```

## 15. 将秒数转换为时间格式的字符串

```js
const seconds = 3661; // 一小时是 3600 秒，多出 61 秒

const toTimeString = seconds => new Date(seconds * 1000).toISOString().substr(11, 8);

toTimeString(seconds); // '01:01:01'
```

将秒数转换为 HH: MM: SS 格式的字符串。它通过给定的秒数加上时间戳起始点来创建一个新的 Date 对象，然后将其转换为 ISO 字符串，并提取时间部分得到结果。

## 16. 求某对象所有属性值的最大值

```js
// 数学、语文、英语成绩
const scores = {
  math: 95,
  chinese: 99,
  english: 88
};

const maxObjectValue = obj => Math.max(...Object.values(obj));

// 最高分
maxObjectValue(scores); // 99
```

## 17. 判断对象的值中是否包含有某个值

```js
const obj = {
  name: '张三',
  age: 22
};
const hasValue = (obj, value) => Object.values(obj).includes(value);
```

## 18. 判断对象的值中是否包含有某个键

```js
const obj = {
  name: '张三',
  age: 22
};
const hasValue = (obj, key) => Object.keys(obj).includes(key);
```

## 19. 判断一个对象是否为空

```js
function isEmpty(obj) {
  return Object.getOwnPropertyNames(obj).length === 0 && Object.getOwnPropertySymbols(obj).length === 0;
}
```

## 20. 获取文件扩展名

```js
const fileName = 'useful-js-snippet.md';
const parseFileExtension = fileName => fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2);
```

> 位运算符 (>>>) 确保了即使未找到点号 (.) ，操作也是安全的，因为在这种情况下仍然会返回一个空字符串。

## 21. 切换 CSS 类

```js
const element = document.querySelector('.my-element');

const toggleClass = (el, className) => el.classList.toggle(className);

toggleClass(element, 'active');
```

> `classList.toggle()` 方法从一个元素的 class 列表中添加或移除某个 class。存在则删除，不存在则添加。
