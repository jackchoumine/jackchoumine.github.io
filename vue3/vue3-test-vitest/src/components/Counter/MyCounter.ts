/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-04-29 15:04:53
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-04-29 16:01:10
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
import { type SetupContext, type RenderFunction, h, defineComponent } from 'vue'
import AbstractCounter from './AbstractCounter'

class MyCounter extends AbstractCounter {
  constructor() {
    super()
  }
  render(props: Record<string, unknown>, context: SetupContext): RenderFunction {
    console.log({ count: super.count })
    return () =>
      h('div', { class: 'my-counter' }, [
        h('button', { onClick: super.reduce }, '-'),
        h('span'),
        h('button', { onClick: super.add }, '+')
      ])
  }
}

export default defineComponent({
  name: 'MyCounter',
  setup(props, context) {
    return new MyCounter().setup(props, context)
  }
})
