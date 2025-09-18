<!--
 * @Author      : ZhouQiJun
 * @Date        : 2025-08-27 12:12:43
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-09-18 15:26:16
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
-->
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
  methods: {
    helloThis() {
      console.log({ this: this, mouseX: this.mouseX.value, mouseY: this.mouseY.value })
    },
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
