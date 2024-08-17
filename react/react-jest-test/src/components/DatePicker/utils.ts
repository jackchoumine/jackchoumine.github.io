/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-16 03:17:12
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-18 01:48:06
 * @Description :
 */
import { addDays, formatDate, setDay, startOfWeek } from 'date-fns'
import { chunk } from '../../utils'

export function buildWeeks(year: number, month: number): Date[][] {
  // 本月第一天
  const firstDayOfMonth = new Date(year, month - 1)
  // 本月第一天的日期
  const firstDayOfWeek = startOfWeek(firstDayOfMonth, {
    weekStartsOn: 0,
  })

  const weeks = new Array(6 * 7).fill(0).map((_, index) => {
    return addDays(firstDayOfWeek, index)
  })
  return chunk(weeks, 7)
}

export function buildDayName(weekStartsOn: number): Array<string> {
  const days = new Array(7)
    .fill(0)
    .map((_, index) => {
      return (index + weekStartsOn) % 7
    })
    .map(day => {
      const _day = setDay(new Date(), day)
      return formatDate(_day, 'EEEEEE', { weekStartsOn: 0 })
    })
  return days //['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
}
