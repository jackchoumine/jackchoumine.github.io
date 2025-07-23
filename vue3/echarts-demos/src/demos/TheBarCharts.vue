<!--
 * @Author      : ZhouQiJun
 * @Date        : 2025-07-23 10:53:21
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-07-23 11:12:23
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
-->
<script setup>
import { onMounted, reactive } from 'vue'

import BarChart from './base-charts/BarChart.vue'

const yearCountInfoSeries = [
  {
    type: 'bar',
    data: [
      2, 5, 22, 14, 33, 6, 5, 9, 4, 22, 12, 2, 10, 27, 25, 10, 5, 7, 8, 3, 25, 11, 10, 15,
      11, 9, 28, 42, 19, 27, 16, 13, 24, 32, 17, 30, 9, 12, 12, 9, 20, 41, 34, 17, 16, 27,
      37, 39, 28, 30, 46, 9, 15, 13, 14, 12, 10, 27, 21, 15, 27, 4, 2, 5, 12, 3, 11, 2, 1,
      2, 2, 9, 3,
    ],
  },
]
const yearCountInfo = reactive({
  series: [],
  xAxis: [
    1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963,
    1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977,
    1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991,
    1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005,
    2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2019, 2020,
    2021, 2022, 2024,
  ],
  yAxis: [{ type: 'value', name: '次数' }],
  zoom: { show: true, start: 0, end: 100 },
  grid: { top: '18%', right: '3%', bottom: '18%', left: '0%' },
})
onMounted(() => {
  setTimeout(() => {
    yearCountInfo.series = yearCountInfoSeries
  }, 2000)
})
</script>

<template>
  <div class="TheBarCharts">
    <div class="demo-1">
      <BarChart
        :series="yearCountInfo?.series"
        :x-axis="yearCountInfo?.xAxis"
        :y-axis="yearCountInfo?.yAxis"
        :grid="yearCountInfo?.grid" />
    </div>
  </div>
</template>

<style lang="scss">
.TheBarCharts {
  .demo-1 {
    height: 300px;
    width: 50%;
  }
}
</style>
