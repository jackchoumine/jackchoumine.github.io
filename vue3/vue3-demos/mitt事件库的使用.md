# mitt 的应用

mitt 专注于事件总线功能的微型库，其设计**简洁**且功能**强大**，尤其适合 Vue、React 等框架的跨组件通信场景。

## 安装 mitt

```bash
pnpm add mitt
npm i mitt
yarn add mitt
```

## 使用 mitt

mitt 的使用非常简单，以下是一个基本的示例：

```js
import mitt from 'mitt'

const emitter = mitt()

// 监听事件 在 vue 的 onMounted 或 useEffect 中使用
emitter.on('event', (data) => {
  console.log('Event received:', data)
})

// 触发事件
emitter.emit('event', { message: 'Hello, world!' })

// 移除事件监听 在 vue 的 onUnmounted 或 useEffect 的清理函数中使用
emitter.off('event', listenerFunction)

// 移除所有事件监听
emitter.all.clear()
```

## 配置 ts 类型支持

在 TypeScript 中使用 mitt 时，可以通过定义事件类型来增强类型安全。以下是一个示例：

```ts
import mitt from 'mitt'

type Events = {
  'event-name': { message: string }
}

// 实例化 mitt
const emitter = mitt<Events>()
// 监听事件

emitter.on('event-name', (data) => {
  // NOTE data 的类型将被推断为 { message: string }
  console.log(data.message) // TypeScript 会检查 data 的类型
})
// 触发事件
emitter.emit('event-name', { message: 'Hello, TypeScript!' })

// 移除事件监听
emitter.off('event-name', listenerFunction)
```

## 封装 useMitt 管理全局事件

````ts
/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-06-08 16:40:27
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-06-08 17:33:45
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
import mitt, { type Emitter } from 'mitt'
import { onBeforeUnmount, onMounted, shallowRef } from 'vue'

// TODO 如何扩展 mitt 的事件类型
// 以便不用导入事件类型
// 在 'src/types/globalEvents' // 确保导入了全局事件类型定义
import type { GlobalMittEvents } from '@/types'

// 定义全局事件类型
// 这里的事件类型可以根据实际需求进行扩展
//type GlobalMittEvents = {
//  'user:login': { username: string; password: string }
//}

const _mitt: Emitter<GlobalMittEvents> = mitt<GlobalMittEvents>()

/**
 * useMitt 处理全局事件
 * @param event 事件名称
 * @param onHandler 事件处理函数
 * @returns 一个包含响应式 payload、on、off 和 emit 方法的对象
 * @example
 * ```ts
 * import { useMitt } from '@/hooks'
 * const { payload, on, off, emit } = useMitt('user:login', (data) => {
 * console.log('User logged in:', data)
 * })
 * // 触发事件
 * const { emit } = useMitt('user:login')
 * emit({ username: 'testUser', password: 'testPass' })
 * ```
 */
export function useMitt<EventKey extends keyof GlobalMittEvents>(
  event: EventKey,
  onHandler?: (payload: GlobalMittEvents[EventKey]) => void
) {
  const payload = shallowRef<GlobalMittEvents[EventKey] | null>(null)

  onMounted(() => {
    _mitt.on(event, _onHandler)
  })

  onBeforeUnmount(off)

  function on(callback: (payload: GlobalMittEvents[EventKey]) => void) {
    _mitt.on(event, callback)
  }
  function emit(payload: GlobalMittEvents[EventKey]) {
    _mitt.emit(event, payload)
  }

  function off() {
    _mitt.off(event, _onHandler)
  }

  return {
    /**
     * 事件的 payload 是响应式的 shallowRef
     * 在 globalEvents.ts 中定义的事件类型，便可获得类型提示
     */
    payload,
    /**
     * 触发事件
     * @param payload 事件的负载数据
     */
    emit,
    /**
     * 注册事件处理函数
     * 通常不需要手动调用，因为在组件挂载时会自动注册
     * payload 可获取到事件抛出的数据
     */
    on,
    /**
     * 取消事件监听
     * 通常不需要手动调用，因为在组件卸载时会自动取消监听
     */
    off
  }

  function _onHandler(_payload: GlobalMittEvents[EventKey]) {
    payload.value = _payload
    onHandler?.(_payload)
  }
}
````

### 封装的技巧

> 使用了`shallowRef` 来创建响应式的 `payload`，以便在组件中直接使用而不需要额外的响应式处理。

> 在 `onMounted` 钩子中注册事件监听器，确保组件挂载时就开始监听事件。

> 在 `onBeforeUnmount` 钩子中调用 `off` 方法，确保组件卸载时清理事件监听器，避免内存泄漏。

> 使用泛型 `EventKey` 来确保传入的事件名称与全局事件类型 `GlobalMittEvents` 中定义的事件一致，从而提供类型安全。

> 暴露了 on、emit 和 off 方法，方便使用者手动处理事件，使用方式上和 mitt 保持一致。

### 把 GlobalMittEvents 声明为全局类型

可避免导入语句。

在`types/global.d.ts` 中添加：

```ts
declare global {
  type GlobalMittEvents = {
    'user:login': { username: string; password: string }
  }
}

// 确保文件是一个模块文件,export {} 不导出任何内容
// 只要文件中有 import 或 export，它就会被 TypeScript 识别为“模块文件”。
export {}
```

> 注意：务必把 `types/global.d.ts` 纳入 include 或 files 中，以确保 TypeScript 能正确识别。

## 注意事项

> 事件必须**先注册后触发**，否则会导致事件无法被监听到。

> 在使用 mitt 时，确保在组件卸载时清理事件监听器，以避免内存泄漏。

> 事件名称应具有描述性，以便于理解和维护，推荐使用`module:event-name`的格式来命名事件。

> 将事件的类型定义在一个单独的文件中，可以提高代码的可读性和可维护性。

## 小结

mitt 是一个轻量级的事件总线库，适用于 Vue、React 等框架的跨组件通信。它提供了简单的 API 来注册、触发和移除事件监听器，并且支持 TypeScript 的类型定义，增强了代码的可读性和可维护性。通过合理使用 mitt，可以有效地管理组件间的通信逻辑。
