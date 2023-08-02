<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-20 19:28:10
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-03 00:01:40
 * @Description : 
-->
<script>
import ContractItem from './ContractItem.vue'
export default {
  name: 'ContractList',
  components: {
    ContractItem,
  },
  // props: {
  //   persons: {
  //     type: Array,
  //     default: () => [],
  //   },
  // },
  data() {
    return {
      bgColor: 'green',
    }
  },
}
</script>

<template>
  <section class="contract-list" :style="{ color: 'red', 'background-color': bgColor }">
    <ContractItem
      style="margin-bottom: 20px"
      v-for="item in $store.getters.persons"
      :key="item.img"
      :name="item.name"
      :company="item.company"
      :city="item.city"
      :twitter="item.twitter"
      :position="item.position"
      :phone="item.phone"
      :img="item.img" />
  </section>
</template>
