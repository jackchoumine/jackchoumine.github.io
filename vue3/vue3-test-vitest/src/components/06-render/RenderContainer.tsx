/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-02-28 10:48:29
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-02-28 12:22:33
 * @Description : prop自定义渲染函数
 */
import type { VNode } from 'vue'

// eslint-disable-next-line no-undef
export type RenderFn = (data: Recordable<unknown>, key?: string) => JSX.Element | VNode

type Props = { render: RenderFn; data: Recordable<unknown>; key?: string }

export default function RenderContainer(props: Props) {
  return props.render?.(props?.data, props?.key)
}
