<!--
 * @Description : 
 * @Date        : 2021-11-10 21:40:59 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-11-10 22:59:45 +0800
 * @LastEditors : JackChou
-->
<template>
  <div ref="lineChartContainer" class="line-chart"></div>
</template>

<script lang="ts">
export default {
  name: 'LineChart',
}
</script>

<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
// @ts-ignore
import { event } from '@utils'

const lineChartContainer = ref<HTMLDivElement | null>(null)
type Props = {
  title: string
  data: any[]
  xAxis: string
  yAxis: string
}

const options = {
  legend: {},
  tooltip: {},
  dataset: {
    dimensions: ['product', '2015', '2016', '2017'],
    source: [
      { product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7 },
      { product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1 },
      { product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5 },
      { product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1 },
    ],
  },
  xAxis: { type: 'category' },
  yAxis: {},
  series: [{ type: 'line' }, { type: 'line' }, { type: 'line' }],
}
onMounted(() => {
  const myChart = echarts.init(lineChartContainer.value!)
  myChart.setOption(options)
  console.log('vue3', 22)
  console.log(event.emit('event-name', 'hello'))
  event.on('vnode-before-unmount', () => {
    console.log(33)
    myChart.dispose()
    console.log('dispose')
  })
})
</script>
<style lang="scss">
.line-chart {
  width: 100%;
  height: 400px;
}
</style>
