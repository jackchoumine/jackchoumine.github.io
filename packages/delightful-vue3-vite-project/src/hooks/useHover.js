import hoverintent from 'hoverintent'
import { ref, onMounted } from 'vue'
const options = {
  in: () => undefined,
  out: () => undefined,
}

function useHover(target, inAndOut = options, opts = undefined) {
  const isHover = ref(false)

  onMounted(() => {
    detectHover(target)
  })

  function detectHover(target) {
    const _target = target?.value ? target.value : target
    console.log(_target)
    if (_target) {
      opts &&
        hoverintent(
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
        hoverintent(
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

  return isHover
}

export default useHover
