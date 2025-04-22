<script>
import { useCounter, useMouse } from '@/hooks'

const { x, y, mixins: mouseMixins } = useMouse()
const { countIn, mixins: countMixins } = useCounter(10)

export default {
  name: 'HomePage',
  components: {},
  props: {},
  mixins: [mouseMixins, countMixins],
  data() {
    return {
      mouseX: x,
      mouseY: y,
      countIn,
    }
  },
  watch: {
    'countIn.value': {
      handler(val) {
        console.log('countIn变化：', val)
      },
    },
  },
  mounted() {
    console.log('component mounted')
  },
}
</script>

<template>
  <div class="example">
    <div>({{ mouseX }}, {{ mouseY }})</div>
    <p>count {{ countIn }} doubleCount {{ doubleCountIn }}</p>
    <button @click="addIn(1)">+</button>
  </div>
</template>
