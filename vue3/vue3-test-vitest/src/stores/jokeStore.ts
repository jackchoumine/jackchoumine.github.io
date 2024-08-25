/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-25 17:50:53
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-25 18:51:32
 * @Description : jokeStore
 */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useJokeStore = defineStore(
  'jokeStore',
  () => {
    const joke = ref('')
    const loading = ref(false)
    const jokeLetterCount = computed(() => {
      return joke.value?.length ?? 0
    })

    function fetchJoke() {
      const headers = {
        accept: 'application/json'
      }
      loading.value = true
      fetch('https://icanhazdadjoke.com', {
        headers
      })
        .then((res) => res.json())
        .then((data) => {
          joke.value = data.joke
        })
        .finally(() => {
          loading.value = false
        })
    }

    return {
      loading,
      joke,
      jokeLetterCount,
      fetchJoke
    }
  },
  {
    persist: {
      storage: window.sessionStorage,
      // 需要被持久化的 key，默认所有 key
      paths: ['joke']
    }
  }
)
