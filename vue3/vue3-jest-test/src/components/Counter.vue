<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-09-01 10:31:25
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-09-01 10:42:29
 * @Description : 
-->
<template>
  <button role="increment" @click="increment" />
  <button role="submit" @click="submit" />
</template>

<script>
export default {
    data() {
        return {
            count: 0
        }
    },
    methods:{
        // NOTE 触发自定义事件的方法命名
        // 1. onCustomEvent 和 触发的2023年9月1日 15:12:48保持一致
        // 2. handleCustomEvent
        submit(){
            this.$emit('submit',this.count)
        },
        increment(){
            this.count ++
        }
    }
}
</script>
