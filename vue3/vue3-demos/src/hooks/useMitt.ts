/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-06-08 16:40:27
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-06-09 13:00:30
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
import mitt, { type Emitter } from 'mitt'
import { onBeforeUnmount, onMounted, readonly, shallowRef } from 'vue'

// TODO 如何扩展 mitt 的事件类型
// 以便不用导入事件类型
// 在 'src/types/globalEvents' // 确保导入了全局事件类型定义
//import type { GlobalMittEvents } from '@/types'

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
  onHandler?: ((payload: GlobalMittEvents[EventKey]) => void) | boolean
) {
  const payload = shallowRef<GlobalMittEvents[EventKey] | null>(null)

  onMounted(() => {
    // 明确传递 false 才不注册事件处理函数，默认注册
    if (onHandler !== false) {
      _mitt.on(event, _onHandler)
    }
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
    // console.log(`Event ${event} listener removed.`)
  }

  return {
    /**
     * 事件的 payload 是响应式的 shallowRef
     * 在 globalEvents.ts 中定义的事件类型，便可获得类型提示
     */
    payload,
    // payload: readonly(payload),
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
    if (typeof onHandler === 'function') onHandler(_payload)
    // console.log(`Event ${event} triggered with payload:`, _payload)
  }
}
