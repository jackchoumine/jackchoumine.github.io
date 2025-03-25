/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-23 01:54:24
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-03-24 18:20:16
 * @Description :
 */
import axios from 'axios'
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
    axios
      .get('https://icanhazdadjoke.com', {
        //.get('/api/jokes', {
        headers
      })
      .then((res) => {
        // console.log(res)
        if (200 <= res.status && res.status < 299) {
          return res.data
        }
        return Promise.reject(new Error('获取笑话失败'))
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
