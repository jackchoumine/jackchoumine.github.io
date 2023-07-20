<template>
  <div>
    <input type="text" :value="amount" @input="onInput" />
  </div>
</template>
<script>
import { defineComponent, ref, reactive, watch, computed } from 'vue'
const numberFraction = (value, fractionDigits = 2) => {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value)
}
export default defineComponent({
  name: 'MyModel',
  props: {
    amount: {
      type: [String, Number],
    },
    amountModifiers: {
      default: () => ({}),
    },
  },
  emits: ['update:amount'],
  setup(props, { emit }) {
    const onInput = event => {
      let value = event.target.value.replace(/\,|￥/g, '')
      if (props.amountModifiers) {
        if (value.includes('.')) {
          value = numberFraction(value, 2)
          console.log(value)
        } else {
          value = numberFraction(value, 0)
        }
      }
      //BUG value 保留两位小数了,还是显示多个小数
      emit('update:amount', value)
    }
    return { onInput }
  },
})
</script>
