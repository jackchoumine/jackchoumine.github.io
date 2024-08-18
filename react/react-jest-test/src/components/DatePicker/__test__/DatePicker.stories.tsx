/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-16 03:08:07
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-18 03:23:05
 * @Description : DatePicker 组件
 */
import type { Meta, StoryObj } from '@storybook/react'
// import { fn } from '@storybook/test'
import { DatePicker } from '../DatePicker'

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof DatePicker>

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    calendar: {
      year: 2024,
      month: 8,
    },
    selectedDate: new Date(2024, 7, 17),
  },
}

export default meta
