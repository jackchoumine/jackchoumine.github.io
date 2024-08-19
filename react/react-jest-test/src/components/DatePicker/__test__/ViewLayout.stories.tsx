/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-16 03:08:07
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-18 03:48:51
 * @Description : ViewLayout 组件
 */
import type { Meta, StoryObj } from '@storybook/react'
// import { fn } from '@storybook/test'
import { ViewLayout } from '../components'
import React from 'react'
import { DatePicker } from '../DatePicker'

const meta = {
  title: 'Components/ViewLayout',
  component: ViewLayout,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ViewLayout>

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    header: {
      left: <button>{'<'}</button>,
      middle: <div>middle</div>,
      right: <button>{'>'}</button>,
    },
    body: (
      <DatePicker
        calendar={{ year: 2024, month: 8 }}
        selectedDate={new Date(2024, 7, 19)}
      />
    ),
    footer: <div>footer</div>,
  },
}

export default meta
