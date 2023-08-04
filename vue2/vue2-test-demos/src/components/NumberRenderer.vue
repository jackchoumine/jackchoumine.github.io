<template>
  <span>{{ numbers }}</span>
</template>

<script>
export default {
  name: 'NumberRenderer',
  props: {
    even: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    numbers() {
      let i = 0
      const evens = []
      const odds = []
      while (i <= 6) {
        if (i % 2 === 0) {
          evens.push(i)
        } else {
          odds.push(i)
        }
        i++
      }
      return this.even ? evens.join(',') : odds.join(',')
    }
  }
};
</script>
