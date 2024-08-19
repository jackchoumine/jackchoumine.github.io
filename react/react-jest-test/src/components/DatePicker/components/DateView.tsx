/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-18 04:18:43
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-18 18:15:46
 * @Description :
 */
import React, { useState } from 'react'
import { DatePicker } from '../DatePicker'
import ViewLayout from './ViewLayout'
import { modulo } from '../../../utils/math'

export default function DateView(props: any) {
  const [calendar, setCalendar] = useState({ year: 2024, month: 8 })
  //   const calendar = { year: 2024, month: 8 }
  const selectedDate = new Date(2024, 7, 19)

  const toPrevMonth = () => {
    changeMonth(-1)
  }
  const toNextMonth = () => {
    changeMonth(1)
  }

  function changeMonth(increment: number) {
    // increment 为 1 或 -1
    const newMonthIndex = modulo(calendar.month - 1 + increment, 12)
    // -1 月   Math.floor(-2/12)  -2 —>  年减 2
    // 0 月   Math.floor(-1/12)  -1 —>  年减 1
    // 1 月   Math.floor(0/12） —> 0 年不变
    // 11 月  Math.floor(10/12) —> 0 年不变
    // 12 月  Math.floor(11/12) —> 0 年不变
    // 13 月  Math.floor(12/12) —> 1 年加 1
    // 14 月  Math.floor(13/12) —> 2 年加 2
    const newYear = calendar.year + Math.floor((calendar.month - 1 + increment) / 12)
    setCalendar({ year: newYear, month: newMonthIndex + 1 })
  }

  return (
    <ViewLayout
      header={{
        left: (
          <div
            style={{ width: '1.5rem', height: '1.5rem', backgroundColor: '#ccc' }}
            onClick={toPrevMonth}>
            {'<'}
          </div>
        ),
        middle: (
          <div>
            {calendar.month}月 {calendar.year}年
          </div>
        ),
        right: <div onClick={toNextMonth}>{'>'}</div>,
      }}
      body={<DatePicker calendar={calendar} selectedDate={selectedDate} />}
      footer={<div>footer</div>}
    />
  )
}
