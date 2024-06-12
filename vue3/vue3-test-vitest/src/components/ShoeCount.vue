<script setup lang="ts">
import { ref, computed } from 'vue'

const shoeCount = ref(8)
const amount = computed(() => {
  return calculateAmount(shoeCount.value)
})

const DISCOUNT = 0.8
const SHOE_PRICE = 100.0
function calculateAmount(shoeCount: number) {
  if (shoeCount >= 10) {
    return shoeCount * SHOE_PRICE * DISCOUNT
  } else {
    return shoeCount * SHOE_PRICE
  }
}
</script>

<template>
  <div>
    <label for="shoe-count">
      <input type="number" id="shoe-count" v-model="shoeCount" />
    </label>
    <div>￥{{ amount }}</div>
  </div>
</template>
