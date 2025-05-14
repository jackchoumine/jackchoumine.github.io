# AbortController 可终止任何行为

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

## AbortSignal 静态方法

AbortSignal 有两个静态方法，无需创建实例，直接调用。

### AbortSignal.timeout(n) 超时终止信号

200 毫秒取消 fetch 请求

```js
fetch('https://jsonplaceholder.typicode.com/todos', {
  signal: AbortSignal.timeout(200),
})
  .then(res => res.json())
  .then(data => {
    console.log(data, 'zqj log')
  })
  .catch(err => {
    console.log(err, 'zqj log')
  })
```

### AbortSignal.any([signal1,signal2,...])

signal1,signal2 ... 任意一个信号触发终止信号，使用 AbortSignal.any 的行为都被取消。

fetch 可能需要超时取消，也可能需要手动取消，使用 AbortSignal.any 可以同时取消。

```js
const timeoutSignal = AbortSignal.timeout(2000) // 2 秒后超时取消
const manualSignal = new AbortController().signal
fetch('https://jsonplaceholder.typicode.com/todos', {
  signal: AbortSignal.any([timeoutSignal, manualSignal]),
})
  .then(res => res.json())
  .then(data => {
    console.log(data, 'zqj log')
  })
  .catch(err => {
    console.log(err, 'zqj log')
  })
// 1 秒后手动取消
setTimeout(() => {
  manualSignal.abort() // fetch 请求被取消
}, 1000)
```

## 使得任何行为都可以取消

经过上面的介绍，AbortController 可以取消 fetch、事件监听和 promise，其实不难发现，它可取消任何行为，只要该行为提供了 signal 接口。

### 封装一个取消的 setInterval

setInterval 在时间无法做到精确，且取消比较麻烦，使用 AbortController 可以轻松取消。

封装一个取消的 setInterval，解决这两个问题。

```js
function setIntervalWithAbort(fn, interval) {
  const controller = new AbortController()
  const signal = controller.signal
  setTimeout(function repeat() {
    if (signal.aborted) return
    fn()
    setTimeout(repeat, interval)
  }, interval)
  return controller
}
// Usage
const controller = setIntervalWithAbort(() => {
  console.log('zqj log')
}, 1000)
// 5 秒后取消
setTimeout(() => {
  controller.abort()
}, 5000)
```

返回 controller，调用 controller.abort() 取消函数。

setTimeout + 递归解决了 setInterval 的时间不准确问题。

setIntervalWithAbort 被取消时，外部希望收到通知，还可以包装一下 abort 函数，让外部传递函数进来，取消时调用。

```js
function setIntervalWithAbort(fn, interval) {
  const controller = new AbortController()
  const signal = controller.signal
  let timer2
  let times = 0
  setTimeout(function repeat() {
    if (signal.aborted) return
    ++times // 记录次数 取消时通知外部
    fn()
    setTimeout(repeat, interval)
  }, interval)
  const abort = callback => {
    controller.abort()
    callback && callback(times)
  }
  return {
    abort,
  }
}
// Usage
const controller2 = setIntervalWithAbort(() => {
  console.log('zqj log')
}, 1000)

setTimeout(() => {
  controller2.abort(times => {
    console.log(times, 'zqj log')
  })
}, 5000)
```

### 取消函数执行

debounce 函数，常规实现：

```js
export function debounce(fn, wait = 200, immediate = false) {
  let timer
  return (...rest) => {
    immediate && !timer && fn(...rest)
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...rest)
    }, wait)
  }
}
```

AbortController 实现：

```js
export function debounce(fn, wait = 200, immediate = false) {
  let controller = null
  return (...rest) => {
    immediate && !controller && fn(...rest)
    if (controller) {
      controller.abort()
    }
    controller = new AbortController()
    const signal = controller.signal
    setTimeout(() => {
      // 检查是否被取消
      if (!signal.aborted) {
        fn(...rest)
        controller = null
      }
    }, wait)
  }
}
```

> throttle 适合使用 AbortController 实现吗？

不适合。 throttle 的本质是到达某一个时刻才调用，其他时刻**跳过调用**，而是 debounce 是新的调用来了**取消之前的调用**，是取消行为。

throttle 需要记录调用时刻，而 debounce 不需要记录调用时刻。

## 参考

[The AbortController, and Aborting Fetch Requests in Javascript](https://asleepysamurai.com/articles/abortcontroller-and-aborting-fetch-requests)

[Using AbortController as an Alternative for Removing Event Listeners](https://css-tricks.com/using-abortcontroller-as-an-alternative-for-removing-event-listeners/)

[Don't Sleep on AbortController](https://kettanaito.com/blog/dont-sleep-on-abort-controller)

## 小结

- AbortController 是一个非常实用的工具，可以轻松取消请求、移除事件监听器以及取消 promise，更加符合直觉。
- 两个静态方法 AbortSignal.timeout 和 AbortSignal.any，可以实现超时取消和任意一个信号触发取消。
- 使用 AbortController 可以终止任何行为，只要该行为提供了 signal 接口。

> 关于博主：前端程序员，最近专注于 webGis 开发。加微信：MasonChou123，进技术交流群。
