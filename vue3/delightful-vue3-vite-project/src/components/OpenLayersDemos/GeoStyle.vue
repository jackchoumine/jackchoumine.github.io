<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-09 18:19:04
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-09 18:51:36
 * @Description : 几何图形的样式
-->
<script lang="ts" setup>
import { initMap } from './tool'

const mapContainer = ref<HTMLElement>()

let map = null
onMounted(() => {
  const result = initMap({
    target: mapContainer.value,
  })
  map = result.map
})
</script>

<template>
  <div class="map-container" ref="mapContainer"></div>
</template>

<style scoped lang="scss">
@import './map-style';
</style>
