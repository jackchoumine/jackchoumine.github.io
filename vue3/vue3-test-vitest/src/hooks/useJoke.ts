/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-23 01:54:24
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-23 01:59:42
 * @Description :
 */
import { ref } from 'vue'

export default function useJoke() {
  const loading = ref(false)
  const joke = ref('')

  fetchJoke()

  return {
    loading,
    joke,
    fetchJoke
  }

  function fetchJoke() {
    const headers = {
      accept: 'application/json'
    }
    loading.value = true
    fetch('https://icanhazdadjoke.com/hello', {
      headers
    })
      .then((res) => {
        // console.log(res)
        if (!res.ok) {
          return Promise.reject(new Error('获取笑话失败'))
        }
        return res.json()
      })
      .then((data) => {
        joke.value = data.joke
      })
      .catch((err) => {
        joke.value = err.message
      })
      .finally(() => {
        loading.value = false
      })
  }
}
