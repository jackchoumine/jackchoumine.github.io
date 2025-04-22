<script>
import { useCounter, useMouse } from '@/hooks'

const { x, y, mixins: mouseMixins } = useMouse()
const { count, mixins: countMixins } = useCounter(10)

export default {
  name: 'HomePage',
  components: {},
  props: {},
  mixins: [mouseMixins, countMixins],
  data() {
    return {
      mouseX: x,
      mouseY: y,
      count,
    }
  },
}
</script>

<template>
  <div class="example">
    <div>({{ mouseX }}, {{ mouseY }})</div>
    <p>count {{ count }} doubleCount {{ doubleCount }}</p>
    <button @click="add(1)">+</button>
  </div>
</template>
