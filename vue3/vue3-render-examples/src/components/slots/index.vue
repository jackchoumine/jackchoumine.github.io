<template>
  <div class="slots">
    <h1>插槽学习</h1>
    <RenderSlots />
  </div>
</template>
<script lang="js">
// import { ref, reactive, watch, computed } from 'vue'

import RenderSlots from './RenderSlots'
export default {
  name: 'LearnSlot',
  components: { RenderSlots },
  setup(props, { emit, attrs, slots }) {
    return {}
  },
}
</script>
<style scoped lang="scss"></style>
