import { onMounted, onBeforeMount, ref } from 'vue'
import { unwrap } from './utils'
export default function useEvent(el = ref(document), name, handler) {
  el = unwrap(el)
  const remove = () => el && el.removeEventListener(name, handler)

  onMounted(() => el && el.addEventListener(name, handler))
  onBeforeMount(remove)

  return remove
}
