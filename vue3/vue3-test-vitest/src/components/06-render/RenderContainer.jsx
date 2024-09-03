/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-02-28 10:48:29
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-09-02 16:19:01
 * @Description : prop自定义渲染函数
 */
export default function RenderContainer(props) {
  return props.render?.(props?.data, props?.key)
}
