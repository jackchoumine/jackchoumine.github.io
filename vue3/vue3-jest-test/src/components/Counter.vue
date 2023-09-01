<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-09-01 10:31:25
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-09-01 10:31:36
 * @Description : 
-->
<template>
  <button role="increment" @click="count += 1" />
  <button role="submit" @click="$emit('submit', count)" />
</template>

<script>
export default {
    data() {
        return {
            count: 0
        }
    }
}
</script>
