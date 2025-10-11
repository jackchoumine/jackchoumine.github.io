/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-10-05 01:35:42
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-10-05 02:51:27
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
import { GUI } from 'dat.gui'
import { Color, type Mesh, type MeshBasicMaterial } from 'three'
import { type OrbitControls } from 'three/addons'

export { addDebugGUI }

function addDebugGUI(cube: Mesh, controls: OrbitControls) {
  console.log({ cube }, 'zqj')
  const gui = new GUI()
  // 字符串 -> 输入框
  gui.add(document, 'title')
  // 布尔值 -> 复选框
  gui.add(cube, 'visible')

  const color = {
    value: `#${(cube.material as MeshBasicMaterial).color.getHexString()}`,
  }
  // 添加颜色
  gui.addColor(color, 'value').onChange(v => {
    //;(cube.material as MeshBasicMaterial).setValues({ color: new Color(v) })
    ;(cube.material as MeshBasicMaterial).color = new Color(v)
    ;[1].forEach(v => {
      console.log({ v }, 'zqj')
    })
  })
  // 添加分组
  const position = gui.addFolder('位置')
  position.open()
  // 数值 -> 进度条
  position.add(cube.position, 'x', 0, 5, 0.1) // min,max,step
  position.add(cube.position, 'y', 0, 5, 0.05)
  position.add(cube.position, 'z', 0, 5, 0.01)

  // 下拉菜单，需要传入下拉选项
  gui
    .add({ type: '1' }, 'type', {
      方案1: '1',
      方案2: '2',
    })
    .onChange(type => {
      if (type == '1') {
        cube.scale.set(1.5, 1.2, 2)
      } else if (type === '2') {
        cube.scale.set(1.4, 1.4, 2.1)
      }
    })
  // 重置轨道控制器
  // 函数 -> 按钮
  gui.add(controls, 'reset')
}
