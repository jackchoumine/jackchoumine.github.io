# 可维护的 js

## 编程风格

### 一致的缩进

> 不推荐使用 tab (制表符)进行缩进，因为不同的操作系统或者编辑器，对制表符解释不同，可能导致显示不同。

### 短小且有意义的命名

> 命名短小了，就容易丢失意义，具体和长的命名，容易保证有见名知义。当短小和意义无法兼得，有意义优先。

## 代码组织方式

### null 和 undefined 的使用

### 立即执行的函数需要被一眼看出来

### 简单的 if else 使用三运算符代替

### 事件的处理

编写事件处理程序时，我们应该遵守一下几点:

- 以`on`或者`handle`作为事件处理函数命名的开头, 如`onClickBtn`、`handleClickBtn`；
- 隔离业务逻辑：将业务逻辑从事件处理函数中分离处理；
- 只有事件处理函数能接触到 event 对象：结合第二条，需要用到和事件对象相关的属性，通过参数传递，业务逻辑不再和 html 耦合，就能独立测试业务逻辑了，复用也方便了。

```js
// bad
const inputEl = document.querySelector('#input')
inputEl.addEventListener('input', a)
function a(e) {
  const text = e.target.value.toUpperCase()
  // ... 其他复杂逻辑
  inputEl.value = text
}

// good
const inputEl = document.querySelector('#input')
inputEl.addEventListener('input', onInput)
function onInput(e) {
  const text = toUpperCase(e.target.value)
  inputEl.value = text
}

// 可单独测试、复用也方便
function toUpperCase(text) {
  // ... 其他复杂逻辑
  return text.toUpperCase()
}
```

### 将配置数据从代码中分离

项目中通常有一些配置数据，配置数据和代码混合，修改其一时，容易修改另外一方，导致程序出错，所以把配置数据从代码分离，能避免这种错误，从而提高维护性。

项目中通过具有这些配置数据：

- 全局常量；
- 多处用到的重复值；
- 库的配置数据;
- 服务器相关配置。

把配置数据抽离后统一放在一个目录或者文件中，方便集中管理：

- js 文件中，方便和 js 直接交互；
- json 文档，通过 http 获取，比如含有敏感信息的配置，等用户登录后再去获取。

### 尽可能使用 filter、map、some 和 forEach 等数组函数代替循环

普通循环需要多个变量控制边界，不好处理边界情况。

### 循环中保持 continue 和 break 少

多个 continue 或者 break 会让循环出口(循环结束的条件)变成多个，滥用后代码逻辑会逐渐变乱。

减少 continue 的方法：

1. 合并；
2. 使用 if else 代替 continue；
3. 提取函数。

### 短路优先原则

代码的执行路径尽可能短，理解路径和跟踪变量的路径也变短了，会更加容易理解和维护。

遵循这个原则，倡导下面这些做法：

| 操作                 | 目的                                                             |
| -------------------- | ---------------------------------------------------------------- |
| 拆分函数             | 保持函数短小                                                     |
| 提取复杂条件         | 控制逻辑尽可能短                                                 |
| 提前返回             | 缩短理解和阅读函数的时间 -- 因为使用函数时，主要关注参数和返回值 |
| 提前处理错误         | 快速理解意外情况                                                 |
| 简单条件在前         | 简单条件在前，可降低认知负担                                     |
| 省去 else            | 省去 else + 提前返回，可降低认知负担，减少理解分支               |
| 变量在使用之前才声明 | 缩短变量的作用域，方便跟踪                                       |

减少循环中的 continue 和 break，也是遵循短路优先原则的体现。

## 小结

## 参考

![[译]JavaScript中几种愚蠢的写法](https://www.cnblogs.com/ziyunfei/archive/2012/11/15/2770948.html)

![为何部分程序员从不使用 break 或 continue 语句？](https://www.zhihu.com/question/334216911)

![如何避免循环中丑陋的break和continue](https://blog.csdn.net/SweetTool/article/details/96740628)
