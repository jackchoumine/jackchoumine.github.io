/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-04-29 15:04:39
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-04-29 16:00:26
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
import { h, onMounted, onUnmounted, ref, type RenderFunction, type SetupContext } from 'vue'
import type Disposable from './Disposable'

export default abstract class AbstractCounter implements Disposable {
  count
  constructor() {
    this.count = ref(10)
  }
  setup(props: Record<string, unknown>, context: SetupContext): RenderFunction {
    onMounted(() => this.init(props, context))
    onUnmounted(() => this.dispose())
    return this.render(props, context)
  }
  init(props: Record<string, unknown>, context: SetupContext) {
    console.log('init counter')
  }
  dispose() {
    console.log('counter dispose')
    this.count.value = 0
  }
  abstract render(props: Record<string, unknown>, context: SetupContext): RenderFunction
  add() {
    this.count.value += 1
  }
  reduce() {
    this.count.value -= 1
  }
}
