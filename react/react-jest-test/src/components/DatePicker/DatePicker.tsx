/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-16 03:08:07
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-18 18:18:00
 * @Description : DatePicker 组件
 */
import { getDate, isSameDay } from 'date-fns'
import React, { useMemo } from 'react'
import { buildWeeks, buildDayName } from './utils'
import styled, { css } from 'styled-components'

type Calendar = {
  year: number
  month: number
}

const Td = styled.td`
  height: 2.4rem;
  width: 2.4rem;
  border: none;
  text-align: center;
  border: 1px solid #ddd;
  /* border-radius: 50%; */
  padding: 0;
  ${({ isToday, isInCurMonth, isSelected }) => {
    if (isSelected) {
      return css`
        background-color: #e0b4b4;
        font-weight: bold;
        cursor: pointer;
      `
    }
    if (isToday) {
      return css`
        background-color: #ccc;
        cursor: pointer;
        &:hover {
         background-color: #eee;
        }
      `
    }
    if (!isInCurMonth) {
      return css`
      opacity: 0.5;
      cursor: not-allowed;
      `
    }
    return css`
      background-color: #fff;
      cursor: pointer;
      &:hover {
       background-color: #eee;
      }
    `
  }}
`

export type DatePickerProps = {
  calendar: Calendar
  selectedDate: Date
}

export function DatePicker(props: DatePickerProps): JSX.Element {
  const { selectedDate } = props
  const { year, month } = props.calendar
  const weeks = useMemo(() => buildWeeks(year, month), [year, month])
  const days = useMemo(() => buildDayName(0), [])
  return (
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
            {week.map((day, index) => {
              const isToday = isSameDay(day, new Date())
              const isInCurMonth = day.getMonth() + 1 === month
              const isSelected = isSameDay(day, selectedDate)
              return (
                <Td
                  key={index}
                  isSelected={isSelected}
                  isToday={isToday}
                  isInCurMonth={isInCurMonth}>
                  {getDate(day)}
                </Td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
