// type Handler = (event: Event) => void
import { onMounted, onUnmounted } from 'vue'

export function useOn(
  eventName,
  handler,
  target /*: HTMLElement | Document | Window | BroadcastChannel*/
) {
  onMounted(() => {
    target.addEventListener(eventName, handler)
  })
  onUnmounted(() => {
    target.removeEventListener(eventName, handler)
  })
}
