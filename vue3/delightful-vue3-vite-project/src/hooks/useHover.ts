/* eslint-disable @typescript-eslint/no-unused-vars */

/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-26 18:16:09
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-06-25 10:22:14
 * @Description : 可代替 hover 事件的 hook
 */
import hoverIntent from 'hoverintent'
import { ref } from 'vue'

type InAndOut = {
  in?: (target: HTMLElement) => void
  out?: (target: HTMLElement) => void
}
const options = {
  in: target => undefined,
  out: target => undefined,
}
/**
 * 鼠标移入移出 hook，可设置鼠标停留时间。
 * hover 事件瞬间触发，不能设置停留时间
 * @example
 * ```js
 * const {isHover, setHoverTarget} = useHover({
 *   in: (target) => {
 *     console.log('in', target)
 *   },
 *   out: (target) => {
 *    console.log('out', target)
 *   }
 * })
 * // 模板中设置 hover 的目标元素 ref 前面有冒号
 * // <div :ref="setHoverTarget">hover的目标元素</div>
 * ```
 * @param target 目标元素
 * @param inAndOut 移入移除回调
 * @param inAndOut.in 移入回调
 * @param inAndOut.out 移出回调
 * @param updateTarget 是否更新 hover 的目标元素
 * @param opts hoverIntent配置
 * @link https://www.npmjs.com/package/hoverintent
 */
function useHover(inAndOut: InAndOut = options, updateTarget = false, opts = undefined) {
  const isHover = ref(false)
  const target = ref(null)

  watch(
    target,
    (target, oldTarget) => {
      if (target && target !== oldTarget) {
        detectHover(target)
      }
    },
    { flush: 'post' }
  )

  return {
    isHover,
    setHoverTarget: ele => {
      if (!updateTarget && target.value) return
      target.value = ele
    },
  }

  function detectHover(target) {
    const _target = isRef(target) ? target.value : target
    if (!_target) return
    const { in: inTarget, out } = inAndOut
    opts &&
      hoverIntent(
        _target,
        () => {
          inTarget?.(_target)
          isHover.value = true
        },
        () => {
          out?.(_target)
          isHover.value = false
        }
      ).options(opts)

    !opts &&
      hoverIntent(
        _target,
        () => {
          inTarget?.(_target)
          isHover.value = true
        },
        () => {
          out?.(_target)
          isHover.value = false
        }
      )
  }
}

export { useHover }
