/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-06-03 16:32:34
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-07-23 10:48:25
 * @Description : 菜单配置
 */
export const menuList = [
  {
    name: '基本图表',
    path: 'base-chart',
    children: [
      {
        name: 'barChart',
        path: 'barChart',
      },
    ],
  },
]

export const componentPath = {
  barChart: () => import('./base-charts/BarChart.vue'),
}
