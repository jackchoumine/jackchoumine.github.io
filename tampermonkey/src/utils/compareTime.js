/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-08-12 23:08:37
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-08-12 23:18:42
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开
 * @加微信         : MasonChou123，进技术交流群
 */
// compareTimes.ts

// compareISOString.ts
/**
 * 比较两个 ISO 8601 格式的时间字符串
 * @param time1 第一个时间字符串 (格式: 2024-02-01T12:04:56.968Z)
 * @param time2 第二个时间字符串
 * @returns 比较结果:
 *   - 如果 time1 > time2，返回 1
 *   - 如果 time1 < time2，返回 -1
 *   - 如果 time1 == time2，返回 0
 * @throws 如果输入不是有效的 ISO 8601 时间字符串
 */
export function compareTimes(time1, time2) {
  // 验证输入是否为有效的 ISO 8601 格式
  const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?$/

  if (!isoRegex.test(time1)) {
    throw new Error(`无效的ISO 8601时间格式: ${time1}`)
  }

  if (!isoRegex.test(time2)) {
    throw new Error(`无效的ISO 8601时间格式: ${time2}`)
  }

  const date1 = new Date(time1)
  const date2 = new Date(time2)

  // 额外验证Date对象是否有效
  if (isNaN(date1.getTime())) {
    throw new Error(`无效的时间值: ${time1}`)
  }

  if (isNaN(date2.getTime())) {
    throw new Error(`无效的时间值: ${time2}`)
  }

  const time1Ms = date1.getTime()
  const time2Ms = date2.getTime()

  if (time1Ms > time2Ms) return 1
  if (time1Ms < time2Ms) return -1
  return 0
}
export { compareTimes }

function compareTime2(date1, date2) {
  const time1Ms = date1.getTime()
  const time2Ms = date2.getTime()

  if (time1Ms > time2Ms) return 1
  if (time1Ms < time2Ms) return -1
  return 0
}
