<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-09 19:08:12
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-09 19:15:19
 * @Description : 集合图形选择
-->
<script lang="ts" setup>
const emit = defineEmits(['select', 'undo'])
const geoList = shallowRef([
  { type: 'Point', text: '点', active: false },
  { type: 'LineString', text: '线', active: false },
  { type: 'Polygon', text: '面', active: false },
  { type: 'Circle', text: '圆', active: false },
  { type: 'None', text: '无', active: true },
])

function onSelect(index) {
  geoList.value = geoList.value.map((item, i) => {
    if (i === index) {
      item.active = true //! item.active
      emit('select', item.type)
    } else {
      item.active = false
    }
    return item
  })
}

function undo() {
  emit('undo')
}
</script>

<template>
  <div class="geo-list">
    <ul>
      <li
        v-for="(item, index) in geoList"
        :key="index"
        @click="onSelect(index)"
        :class="{ 'active-item': item.active }">
        {{ item.text }}
      </li>
      <li @click="undo">清除</li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.geo-list {
  position: absolute;
  top: 100px;
  left: 10px;
  z-index: 999;
  background-color: #fff000;
  border-radius: 5px;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      padding: 5px 10px;
      text-align: center;
      cursor: pointer;

      &.active-item {
        background-color: #aaa;
      }

      &:hover {
        background-color: darkcyan;
      }
    }
  }
}
</style>
