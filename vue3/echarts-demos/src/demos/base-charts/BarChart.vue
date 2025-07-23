<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-10-24 14:47:54
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-07-23 11:26:30
 * @Description : 柱状图
-->
<script lang="ts" setup>
import * as echarts from 'echarts'
import { QResizeObserver } from 'quasar'
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue'

//import Lookup from '@/core/Lookup'

const props = defineProps({
  series: {
    type: Array,
    default: () => [
      /**
       * {
       *  name:'活跃账号数',
       *  type:'bar',
       *  data:[],
       * }
       */
    ],
  },
  xAxis: {
    type: [Array, Object],
    default: () => [],
  },
  yAxis: {
    type: Array,
    default: () => [
      {
        type: 'value',
        name: '数量',
      },
    ],
  },
  zoom: {
    type: Object,
    default: () => {
      return {
        show: true,
        start: 0,
        end: 100,
      }
    },
  },
  grid: {
    type: [Object, Boolean],
    default: true,
  },
})
// 主题相关
//const themeInfo = Lookup.local.get('theme.info', 'local')

const chartStyle = reactive({
  width: '100%',
  height: '100%',
})
const barChartRef = ref()
let barChart = null

watch(
  [
    () => props.series,
    () => props.xAxis,
    () => props.zoom,
    () => props.grid,
    () => props.yAxis,
  ],
  (newVal, oldVal) => {
    // if (isEmptyChart(props.xAxis, props.series)) return
    // console.log(newVal, 'zqj log newVal')
    const option = convertOptions(newVal[0], newVal[1], newVal[2], newVal[3], newVal[4])
    barChart?.dispose?.()
    barChart = initChart()
    barChart.setOption(option)
  },
  {
    deep: true,
  }
)
const isEmpty = computed(() => {
  return isEmptyChart(props.xAxis, props.series)
})
onMounted(() => {
  // if (isEmptyChart(props.xAxis, props.series)) return
  barChart = initChart()
  const option = convertOptions([], [], props?.zoom, props?.grid, props?.yAxis)
  barChart.setOption(option)
})

function initChart() {
  return echarts.init(barChartRef.value)
}

function convertOptions(
  series,
  xAxis,
  zoom = { show: true, start: 0, end: 100 },
  hasGrid = true,
  yAxis = [
    {
      type: 'value',
      name: '数量',
    },
  ]
) {
  let dataZoom = [
    zoom,
    {
      type: 'inside',
      start: 94,
      end: 100,
    },
  ]
  if (typeof zoom === 'boolean' && zoom === false) {
    // @ts-ignore
    dataZoom = false
  }
  const grid = {
    top: '12%',
    right: '10%',
    bottom: dataZoom ? '10%' : '0%',
    left: '1%',
    containLabel: true,
  }
  if (!hasGrid) {
    grid.top = '12%'
    grid.left = '0%'
    grid.right = '0%'
    grid.bottom = '0%'
  }
  if (hasGrid && typeof hasGrid === 'object') {
    grid.top = hasGrid.top || '0%'
    grid.right = hasGrid.right || '0%'
    grid.bottom = hasGrid.bottom || '0%'
    grid.left = hasGrid.left || '0%'
  }

  // 主题相关
  const themeConfig = {
    axisLine: {},
  }

  let x = [
    {
      type: 'category',
      data: xAxis,
      axisLine: themeConfig.axisLine,
    },
  ]
  if (!Array.isArray(xAxis) && typeof xAxis === 'object') {
    if (xAxis?.axisLine) {
      xAxis.axisLine = {
        ...xAxis.axisLine,
        ...themeConfig.axisLine,
      }
    } else {
      xAxis = {
        ...xAxis,
        ...{
          axisLine: themeConfig.axisLine,
        },
      }
    }

    x = xAxis
  }
  const y = [
    {
      ...yAxis[0],
      ...{
        axisLine: themeConfig.axisLine,
      },
    },
  ]

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        label: {
          show: true,
        },
      },
    },
    toolbox: {
      show: false,
      //   feature: {
      //     mark: { show: true },
      //     dataView: { show: false, readOnly: false },
      //     magicType: { show: false, type: ['line', 'bar'] },
      //     restore: { show: true },
      //     saveAsImage: { show: true },
      //   },
    },
    calculable: true,
    legend: {
      // 'Growth',
      data: series.map(item => item.name).filter(Boolean),
      itemGap: 5,
    },
    grid,
    xAxis: x,
    yAxis: y,
    // [
    //   {
    //     type: 'value',
    //     name: '数量',
    //     // axisLabel: {
    //     //   formatter: function (a) {
    //     //     a = +a
    //     //     return isFinite(a) ? echarts.format.addCommas(+a / 1000) : ''
    //     //   },
    //     // },
    //   },
    // ],
    dataZoom,
    series,
    // series: [
    //   {
    //     name: '活跃账号数',
    //     type: 'bar',
    //     // ['贵州', '贵阳', '铜仁'],
    //     data: [100, 20, 23], // obama_budget_2012.budget2011List,
    //   },
    //   {
    //     name: '登录人次',
    //     type: 'bar',
    //     data: [70, 10, 5], // obama_budget_2012.budget2012List,
    //   },
    // ],
    graphic: {
      type: 'text', // 类型：文本
      left: 'center',
      top: 'middle',
      silent: true, // 不响应事件
      invisible: !isEmptyChart(xAxis, series), // 有数据就隐藏
      style: {
        fill: '#9d9d9d',
        fontWeight: 'bold',
        text: '暂无数据',
        fontFamily: 'Microsoft YaHei',
        fontSize: '25px',
      },
    },
  }
  return option
}

function onResize({ width, height }) {
  chartStyle.width = width + 'px'
  chartStyle.height = height + 'px'
  nextTick(() => {
    barChart?.resize?.()
  })
}

function isEmptyChart(xAxis, series) {
  console.log({ xAxis, series })
  let isXAxisEmpty = false
  if (Array.isArray(xAxis)) {
    isXAxisEmpty = xAxis.length === 0
  } else if (typeof xAxis === 'object') {
    isXAxisEmpty = xAxis.data.length === 0
  }
  let isSeriesEmpty = false
  if (Array.isArray(series)) {
    isSeriesEmpty = series.length === 0
  }
  return isXAxisEmpty || isSeriesEmpty
}
</script>

<template>
  <!-- <div v-if="isEmpty" class="bar-chart h-full w-full" :style="chartStyle">
    <el-empty description="暂无数据" />
  </div> -->
  <div ref="barChartRef" class="bar-chart h-full w-full" :style="chartStyle"></div>
  <QResizeObserver @resize="onResize" />
</template>

<style scoped lang="scss">
.bar-chart {
  // scss code
}
</style>
