/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-25 17:50:53
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-25 18:15:38
 * @Description : jokeStore
 */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useJokeStore = defineStore('jokeStore', () => {
  const joke = ref('')
  const jokeLetterCount = computed(() => {
    return joke.value?.length ?? 0
  })

  function fetchJoke() {
    const headers = {
      accept: 'application/json'
    }
    fetch('https://icanhazdadjoke.com', {
      headers
    })
      .then((res) => res.json())
      .then((data) => {
        joke.value = data.joke
      })
  }

  return {
    joke,
    jokeLetterCount,
    fetchJoke
  }
})
