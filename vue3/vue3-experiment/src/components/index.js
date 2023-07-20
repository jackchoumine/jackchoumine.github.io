/*
 * @Description: 注册全局组件
 * @Date: 2021-01-09 21:06:09 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-01-14 20:43:27 +0800
 * @LastEditors: JackChou
 */
import WatchTest from './WatchTest.vue'
import WatchEffect from './WatchEffect.vue'
import SetupOne from './SetupOne.vue'
import SetupTwo from './SetupTwo.vue'
import TeleportVue from './TeleportVue.vue'
import SuspenseVue from './SuspenseVue.vue'
import FragmentTest from './FragmentTest.vue'
import MyInput from './MyInput.vue'
import MyButton from './MyButton.vue'
import MyModelTwo from './MyModelTwo.vue'
import MyModel from './MyModel.vue'
const components = [
  WatchTest,
  WatchEffect,
  TeleportVue,
  SuspenseVue,
  FragmentTest,
  SetupOne,
  SetupTwo,
  MyInput,
  MyButton,
  MyModelTwo,
  MyModel,
]
// export const registerComponents = app => {
//   components.forEach(component => {
//     app.component(component.name, component)
//   })
// }
export const registerComponents = {
  install(app) {
    components.forEach(component => {
      app.component(component.name, component)
    })
  },
}
export default components
