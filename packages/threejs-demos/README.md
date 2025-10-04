# threejs 学习笔记

## 介绍

threejs 是一个在浏览器里绘制3D场景的 js 库。基于 webGL, 即 web 图形库，它封装了诸如场景、灯光、阴影、材质、贴图、空间运算等一系列功能，让你不必要再从底层 WebGL 开始写起。

### threejs 三个要素

> 场景

放置物体的容器，类似舞台。

> 相机

类似人眼，可调整角度、位置，展示场景里的不同位置的不同物体。

> 渲染器

接收场景和相机，在浏览器上渲染出 2D 画面。

为何是 2D 画面？浏览器里支持渲染 2D 图形， threejs 会调整角度，让人看上去是 3D。

### hello cube

## 使用 dat.gui 添加调试工具

一个轻量的用户界面库，可通过可视化的界面轻松修改对象属性和执行对象方法。

典型的使用场景：

1. 可视化的调试各种效果参数，比如3D动画效果；
2. 可视化编辑器的辅助工具，比如地图编辑器、特效编辑器。

[例子展示](https://6qrsi.csb.app/)

使用 dat.gui 给 threejs 例子添加调试工具。

### 快速使用

```bash
npm i dat.gui # 安装依赖
npm i @types/dat.gui -D # 类型库
```

```js
import { GUI } from 'dat.gui'

const gui = new GUI()
// 第一个参数是一个对象，第二个参数对象的属性
gui.add(document, 'title') // 返回一个控制器
```

在页面右上角，渲染了一个可动态修改页面 title 的输入框。

dat.gui 会根据属性的值的类型，生成不同的交互表单项，字符串生成输入框、函数生成按钮等等。

### 生成调试工具

threejs 中的立方体，参数很多，不同的参数有不同的效果，一个个的修改代码，显示不太好，此时可使用 dat.gui 生成调试工具。

```ts
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
```

调用 addDebugGUI 传入参数就行了。

更多高级功能可查阅 [API文档](https://github.com/dataarts/dat.gui/blob/master/API.md) 或者 AI 工具。

### 类似的库还有哪些？

`lil-gui`、`Tweakpane`。
