<script setup lang="ts" name="SlotDemos">
import TestSlotted from './TestSlotted.vue'
</script>

<template>
  <div class="slotted-test">
    <TestSlotted>
      <div class="slot1">测试slotted</div>
    </TestSlotted>
    <div class="slot">slot</div>
  </div>
</template>

<style scoped lang="scss">
.slotted-test {
  background-color: #ccc;

  :deep(.test-slot) {
    background-color: green;
  }

  .slot1 {
    background-color: red;
  }

  .slot {
    background-color: lightcoral;
  }
}
</style>
