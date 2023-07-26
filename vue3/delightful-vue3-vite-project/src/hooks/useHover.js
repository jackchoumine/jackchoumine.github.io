/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-02-12 18:41:36
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-27 01:14:33
 * @Description :
 */
import hoverIntent from 'hoverintent'
import { onMounted, ref } from 'vue'

const options = {
  in: () => undefined,
  out: () => undefined,
}

function useHover(inAndOut = options, opts = undefined, target = undefined) {
  const isHover = ref(false)

  onMounted(() => {
    target && detectHover(target)
  })

  function detectHover(target) {
    const _target = target?.value ? target.value : target
    if (_target) {
      opts &&
        hoverIntent(
          _target,
          () => {
            inAndOut.in()
            isHover.value = true
          },
          () => {
            inAndOut.out()
            isHover.value = false
          }
        ).options(opts)

      !opts &&
        hoverIntent(
          _target,
          () => {
            inAndOut.in()
            isHover.value = true
          },
          () => {
            inAndOut.out()
            isHover.value = false
          }
        )
    }
  }

  return { isHover, setHoverEle: detectHover }
}

export { useHover }
