/* eslint-disable @typescript-eslint/no-unused-vars */

/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-26 18:16:09
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-27 15:00:47
 * @Description :
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

  return {
    isHover,
    setHoverTarget: ele => {
      if (!updateTarget && target.value) return
      target.value = ele
    },
  }
}

export { useHover }
