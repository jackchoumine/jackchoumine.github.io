<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-29 09:19:45
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-29 09:29:34
 * @Description : 无渲染组件实现状态逻辑复用
 * FetchJoke.vue
-->
<script>
import { ref } from 'vue'

export default {
  name: 'FetchJoke',
  setup(props, { slots }) {
    const loading = ref(false)
    const joke = ref('')
    const fetchJoke = async () => {
      loading.value = true
      const headers = {
        accept: 'application/json'
      }
      const res = await fetch('https://icanhazdadjoke.com', { headers })
      const data = await res.json()
      joke.value = data.joke
      loading.value = false
    }
    fetchJoke()
    return () => {
      return slots.default({ loading: loading.value, joke: joke.value, fetchJoke })
    }
  }
}
</script>
