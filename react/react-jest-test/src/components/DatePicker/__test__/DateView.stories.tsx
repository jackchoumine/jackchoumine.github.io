/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-16 03:08:07
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-18 17:42:20
 * @Description : ViewLayout 组件
 */
import type { Meta, StoryObj } from '@storybook/react'
// import { fn } from '@storybook/test'
import { ViewLayout } from '../components'
import React from 'react'
import { DateView } from '../components'

const meta = {
  title: 'Components/DateView',
  component: DateView,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DateView>

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}

export default meta
