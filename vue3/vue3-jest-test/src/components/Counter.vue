<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-09-01 10:31:25
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-09-01 15:26:11
 * @Description : 
-->
<template>
  <button role="increment" @click="increment" />
  <button role="submit" @click="submit" />
</template>

<script>
import { ref } from 'vue';
export function submitValidator(value) {
    if (typeof value !== 'number') {
        throw Error(`Count should be a number. Got: ${count}`)
    }
    return true
}
export default {
    emits: {
        submit: submitValidator
    },
    setup(props, ctx) {
        const count = ref(0)
        // NOTE 触发自定义事件的方法命名
        // 1. onCustomEvent 和 触发的2023年9月1日 15:12:48保持一致
        // 2. handleCustomEvent
        function submit() {
            ctx.emit('submit', this.count)
        }
        function increment() {
            count.value++
        }
        return {
            count,
            submit,
            increment
        }
    },
}
</script>
