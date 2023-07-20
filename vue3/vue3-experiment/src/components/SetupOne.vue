<template>
  <div class="setup-one">
    <h1>setup</h1>
    <p>分数：{{ count }}</p>
    <div>年纪：{{ age }}</div>
    <a-button @click="onChangeAge">修改年纪</a-button>
  </div>
</template>
<script>
import { computed, defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'SetupOne',
  props: {
    mark: Number,
  },
  setup(props) {
    const age = ref(0)
    const count = computed(() => props.mark * 0.5)
    function onChangeAge() {
      console.log(this) //NOTE setup 中的this 是 undefined
      age.value = Math.random() * 50
    }
    return { age, onChangeAge, count }
  },
})
</script>
<style scoped lang="scss"></style>
