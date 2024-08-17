/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-16 03:08:07
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-18 01:47:45
 * @Description : DatePicker 组件
 */
import { getDate } from 'date-fns'
import React, { useMemo } from 'react'
import { buildWeeks, buildDayName } from './utils'

type Calendar = {
  year: number
  month: number
}

export type DatePickerProps = {
  /**
   * 是否为主题按钮
   */
  primary?: boolean
  /**
   * 按钮文字
   */
  label: string
  calendar: Calendar
}
export function DatePicker(props: DatePickerProps): JSX.Element {
  const { year, month } = props.calendar
  const weeks = useMemo(() => buildWeeks(year, month), [year, month])
  const days = useMemo(() => buildDayName(0), [])
  return (
    <div>
      <input type='text' placeholder='YYYY-MM-DD' />
      <table>
        <thead>
          <tr>
            {days.map((day, index) => (
              <th key={index}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, index) => (
            <tr key={index}>
              {week.map((day, index) => (
                <td key={index}>{getDate(day)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
