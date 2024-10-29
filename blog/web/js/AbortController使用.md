# AbortController 使用

> 关于博主：前端程序员，最近专注于 webGis 开发。加微信：MasonChou123，进技术交流群。

前端开发中，取消请求、移除事件监听器以及取消 promise 都是非常常见的需求，以前完成这些事情比较复杂，现在有了 AbortController，可以轻易做到，更加符合直觉。

本文介绍 AbortController 如何做到这些。

## AbortController 用法介绍

> 创建一个 AbortController 实例

```JS
const controller = new AbortController()
```

实例具有两个属性

- `abort`，一个方法，调用它，触发 abort 事件，signal 对象的 aborted 属性变成 true；
- `signal`，只读属性，一个对象，可添加事件监听。

```bash
# signal 对象具有的属性
reason: 'AbortError' # 从 abort 方法传入， 默认 AbortError
aborted: false # 是否已取消，取消后会变成 true
```

> 通常需要处理两部分功能：

1. 在`signal`监听 abort 事件，在事件处理器中执行取消操作；
2. 调用`abort`方法，触发 abort 事件，参数为取消的原因，无返回值。

```js
const controller = new AbortController()
const abortSignal = controller.signal

// 监听取消事件
abortSignal.addEventListener('abort', event => {
  console.log('zqj log 执行取消操作', event)
  console.log(abortSignal)
})

console.log(abortSignal)
// 触发取消事件
controller.abort()
```

AbortController 如何与需要取消的操作关联呢？

先看如何取消 fetch 、事件监听和 promise。

## 取消 fetch

```js
function sentHttp() {
  const url = 'https://jsonplaceholder.typicode.com/todos'
  const params = {
    title: 'to',
  }
  const queryUrl = `${url}?${new URLSearchParams(params)}`

  const controller = new AbortController()
  const abortSignal = controller.signal
  abortSignal.addEventListener('abort', event => {
    // console.log(event,'zqj log')
    console.log(abortSignal, 'zqj log')
  })
  // 10 毫秒后取消
  setTimeout(() => {
    controller.abort('abort')
  }, 10)

  fetch(queryUrl, {
    signal: abortSignal,
  })
    .then(res => res.json())
    .then(data => {
      console.log(data, 'zqj log')
    })
    .catch(err => {
      console.log(err, 'zqj log')
    })
}
btn.onclick = sentHttp
```

在一个定时器中执行 `controller.abort` ，fetch 会 reject，实现了 fetch 的超时功能。

## 取消事件监听

```js
const controller = new AbortController()
eventTarget.addEventListener('event-type', handler, {
  signal: controller.signal,
})
// 取消事件监听
controller.abort()
```

以拖拽事件为例，看看如何取消事件监听。

拖拽功能，需要先监听鼠标按下事件，在鼠标按下事件处理器中监听鼠标移动和鼠标松开事件，需要在鼠标松开事件处理器中移除鼠标按下和鼠标移动事件。

```js
el.addEventListener('mousedown', e => {
  // 希望只有鼠标左键按下时才触发
  if (e.buttons !== 1) return

  const onMousemove = e => {
    if (e.buttons !== 1) return
    /* work */
  }

  const onMouseup = e => {
    if (e.buttons !== 1) return
    // 鼠标松开，移除两个事件监听
    window.removeEventListener('mousemove', onMousemove)
    window.removeEventListener('mouseup', onMouseup)
  }

  window.addEventListener('mousemove', onMousemove)
  window.addEventListener('mouseup', onMouseup) // Can’t use `once: true` here because we want to remove the event only when primary button is up
})
```

上面使用两个 removeEventListener 移除两个事件监听，使用 AbortController 可一次性移除多个事件监听。

addEventListener 的第三个参数传递 signal 对象，当调用 controller.abort() 时，监听器被移除。

使用 AbortController 移除两个事件监听

```js
const el = document.querySelector('div')

el.addEventListener('mousedown', e => {
  console.log(e, 'zqj log')
  // https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/buttons
  // buttons 为 1 表示鼠标左键按下
  if (e.buttons !== 1) return
  const { offsetX, offsetY } = e

  const controller = new AbortController()

  window.addEventListener(
    'mousemove',
    e => {
      if (e.buttons !== 1) return
      el.style.left = e.pageX - offsetX + 'px'
      el.style.top = e.pageY - offsetY + 'px'
    },
    {
      // 传递信号
      signal: controller.signal,
    }
  )

  window.addEventListener(
    'mouseup',
    e => {
      if (e.buttons !== 1) return
      controller.abort()
    },
    {
      // 传递信号
      signal: controller.signal,
    }
  )
})
```

上面的例子中，添加鼠标移动和鼠标松开事件时，都传递了相同的 signal 对象，当调用 controller.abort() 时，移除所有监听器。

## 取消 promise

```js
function timeout(duration, signal) {
  return new Promise((resolve, reject) => {
    const handle = setTimeout(resolve, duration)
    signal?.addEventListener('abort', e => {
      clearTimeout(handle)
      reject(new Error('aborted-->'))
    })
  })
}
// Usage
const controller = new AbortController()

timeout(100, controller.signal)
  .then(res => {
    console.log(res, 'zqj log')
  })
  .catch(err => {
    console.log(err, 'zqj log')
    console.log(err.name, 'zqj log')
    console.log(err.message, 'zqj log')
  })
setTimeout(() => {
  controller.abort('abort')
}, 99)
```

## 参考

[The AbortController, and Aborting Fetch Requests in Javascript](https://asleepysamurai.com/articles/abortcontroller-and-aborting-fetch-requests)

[Using AbortController as an Alternative for Removing Event Listeners](https://css-tricks.com/using-abortcontroller-as-an-alternative-for-removing-event-listeners/)

## 小结

- AbortController 是一个非常实用的工具，可以轻松取消请求、移除事件监听器以及取消 promise，更加符合直觉。
- 本文介绍了 AbortController 的基本用法，以及如何取消 fetch、事件监听和 promise。

> 关于博主：前端程序员，最近专注于 webGis 开发。加微信：MasonChou123，进技术交流群。
