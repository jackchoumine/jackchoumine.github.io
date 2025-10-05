# threejs 学习笔记

## 介绍

threejs 是一个在浏览器里绘制3D场景的 js 库。基于 webGL, 即 web 图形库，它封装了诸如场景、灯光、阴影、材质、贴图、空间运算等一系列功能，让你不必要再从底层 webGL 开始写起。

### threejs 三个要素

#### 场景

放置物体的容器，类似舞台。

创建一个场景：

```ts
const scene = new THREE.Scene()
```

#### 相机

类似人眼，可调整角度、位置，展示场景里的不同位置的不同物体。

创建一个相机：

```ts
// field of view 视野范围，单位为角度。
// 类似眼睛睁开大小，0 类似眼睛闭上，什么都看不到，180，就失去聚焦，也会什么都看不到。
// 越大，视野范围越大，物体越小，通常设置为 75 度。
const fov = 75
// 宽高比，默认为 2
// 宽高比会影响图形拉伸、压缩。通常设置和画布的宽高比相同，保证不会压缩或者横向拉伸。
const aspect = windowW / windowH
const near = 0.1 // 近平面到相机的距离
const far = 1000 // 远平面到相机的距离
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.z = 5 // 相机位置默认在坐标原点，threejs 中使用的是右手坐标
```

> 相机的参数

新建一个相机，需要四个参数：

| 参数   | 类型   | 描述         |
| ------ | ------ | ------------ |
| fov    | number | 角度         |
| aspect | number | 宽高比       |
| near   | number | 近截面的距离 |
| far    | number | 远截面的距离 |

> 视锥体

相机的参数确定后，视野范围就被限制在一个四棱台内，这个四棱台在图形学里叫视锥体。小于或者大于这两个距离的物体即不在视锥体内的物体，会被剔除，即不绘制，这叫视锥体剔除技术。

![视锥体](https://threejs.org/manual/resources/frustum-3d.svg)

#### 渲染器

接收场景和相机，在浏览器上渲染出 2D 画面。

为何是 2D 画面？浏览器里支持渲染 2D 图形， threejs 会调整角度，让人看上去是 3D。

```ts
const renderer = new THREE.WebGLRenderer({
  // 启用抗锯齿
  antialias: true,
})
// 浏览器窗口宽高
renderer.setSize(windowW, windowH)
const canvas = renderer.domElement
document.body.appendChild(canvas)
// 创建一个立方体
scene.add((cube = createCube()))
// 渲染必须放在最后
renderer.render(scene, camera)
```

### hello three

创建一个 cube：

```ts
function createCube() {
  const boxWidth = 1
  const boxHeight = 1
  const boxDepth = 1
  // 立方体
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth)
  // 材质
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  // 创建网格物体对象
  const cube = new THREE.Mesh(geometry, material)
  return cube
}
```

> 几何体、材质和网格物体对象有什么关系？

```bash
几何体 (Geometry) + 材质 (Material) = 网格 (Mesh)
    ↓                  ↓                  ↓
 物体的形状           外观特性           可渲染的3D物体
```

几何体提供形状，材质提供外观，网格将它们组合成可以在3D场景中渲染、变换和动画的实际物体。分离的设计让非常灵活，可自由组合和复用它们。

同一几何体，应用不同的材质，可得到不同的物体；不同的几何体，应用同一材质，可得到不同的物体。

> 相机的轨道运动

场景就像物体，用户想要从不同角度观看舞台上的物体，移动相机就能做到。通过`轨道控制器`可操作相机。

轨道运动：相机围绕目标物体的运动，可看成圆周运动或椭圆运动。

three 为了保持内核小巧，仅包含场景、摄像机、渲染器、原始几何体、纹理、光照、阴影等相关的类，其他功能，比如模型加载，以插件形式提供，需要额外导入。

导入轨道控制器：

```ts
import { OrbitControls } from 'three/addons'

function createControls() {
  // 构造函数两个参数：相机对象，用于事件监听的 dom 元素，第二个参数可选。
  controls = new OrbitControls(camera, renderer.domElement)
  // 轨道控制的属性
  // https://threejs.org/docs/#examples/zh/controls/OrbitControls
}
```

> 渲染循环

加了轨道控制器后，用户操作相机，还是看不到物体在动，是因为场景和相机没有重新渲染。

只要有**动态效果**（物体变化或者相机移动），都要循环渲染。

编写一个循环执行的函数完成渲染工作：

```ts
function renderLoop() {
  renderer.render(scene, camera)
  controls.update()
  //cube.rotation.x = cube.rotation.x + 0.005 // 测试旋转方式
  requestAnimationFrame(renderLoop)
}
```

renderLoop 会在下一次重绘更新你的动画时被调用到。

使用`requestAnimationFrame`的原因：

1. 调函数的调用频率通常与显示器的刷新率相匹配，动画会感觉流畅；
2. 浏览器页面被隐藏后，会暂停执行，性能好。

添加渲染循环后，我们就可在场景、渲染器和轨道控制器创建后，启用渲染循环，之后再添加物体或者改变物体的参数，场景会自动更新。

代码的执行顺序如下：

```bash
# 创建场景
# 创建渲染器
# 创建轨道控制器
# 渲染循环
# 操作相机，场景自动更新
# 改变物体参数，场景自动更新
```

把前面4个步骤封装成一个 initScene 函数：

```ts
/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-10-05 11:32:50
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-10-05 11:45:18
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 * initScene.ts
 */
import * as THREE from 'three'
import { OrbitControls } from 'three/addons'

let scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  controls: OrbitControls
const windowW = window.innerWidth
const windowH = window.innerHeight

export { initScene }

function initScene() {
  scene = new THREE.Scene()
  // field of view 视野范围，单位为角度。
  // 类似眼睛睁开大小，0 类似眼睛闭上，什么都看不到，180，就失去聚焦，也会什么都看不到。
  // 越大，视野范围越大，物体越小，通常设置为 75 度。
  const fov = 75
  // 宽高比，默认为 2
  // 宽高比会影响图形拉伸、压缩。通常设置和画布的宽高比相同，保证不会压缩或者横向拉伸。
  const aspect = windowW / windowH
  const near = 0.1 // 近平面到相机的距离
  const far = 1000 // 远平面到相机的距离
  // 以上参数确定后，视野范围限制在一个四棱台内，在图形学里叫视锥体。
  // 小于或者大于这两个距离的物体，会被剔除，即不绘制，这叫视锥体剔除技术。
  // https://threejs.org/manual/resources/frustum-3d.svg
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  // 相机位置默认在坐标原点，threejs 中使用的是右手坐标
  camera.position.x = 5
  camera.position.y = 5
  camera.position.z = 5
  renderer = new THREE.WebGLRenderer({
    // 抗锯齿
    antialias: true,
  })
  renderer.setSize(windowW, windowH)
  const canvas = renderer.domElement
  document.body.appendChild(canvas)
  controls = createControls()
  renderLoop()
  return {
    scene,
    camera,
    renderer,
    controls,
  }
}

/**
 * 轨道控制器：使相机围绕目标物体进行运动，以查看物体的不同位置。
 * 右键拖动，左键旋转，滚轮拉近拉远相机。
 */
function createControls() {
  // 构造函数两个参数：相机对象，用于事件监听的 dom 元素，第二个参数可选。
  const controls = new OrbitControls(camera, renderer.domElement)
  // 轨道控制的属性
  // https://threejs.org/docs/#examples/zh/controls/OrbitControls
  return controls
}

/**
 * 渲染循环
 * 根据浏览器的刷新率，一直渲染，更新视锥体内的物体
 * 只要有动态效果（物体变化或者相机移动），都要循环渲染
 */
function renderLoop() {
  renderer.render(scene, camera)
  controls.update()
  //cube.rotation.x = cube.rotation.x + 0.005 // 测试旋转方式
  requestAnimationFrame(renderLoop)
}
```

希望浏览器窗口变化，相机的宽高比和渲染器尺寸能及时更新，需要监听 window 的 resize 事件：

```ts
function initScene() {
  // 其他不变
  renderLoop()
  renderOnResize() // 监听窗口变化
  return {
    scene,
    camera,
    renderer,
    controls,
  }
}
```

```ts
function renderOnResize() {
  window.addEventListener('resize', throttle(onWindowResize))
}

function onWindowResize() {
  const windowW = window.innerWidth
  const windowH = window.innerHeight
  // 改变画布尺寸
  renderer.setSize(windowW, windowH)
  // 改变相机宽高比
  camera.aspect = windowW / windowH
  // camera.updateProjectionMatrix() 在相机参数改变后必须调用，以确保投影矩阵与当前参数同步，否则会出现显示异常。
  camera.updateProjectionMatrix()
}
```

重构后的代码:

```ts
import * as THREE from 'three'

let cube: THREE.Mesh
function helloThree() {
  const { scene, controls } = initScene()
  cube = createCube()
  scene.add(cube)
  // 操作物体
  moveCube()
  rotateCube()
  scaleCube()
}

function createCube() {
  const boxWidth = 1
  const boxHeight = 1
  const boxDepth = 1
  // 立方体
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth)
  // 材质
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  // 创建网格物体对象
  const cube = new THREE.Mesh(geometry, material)
  return cube
}

// 操作物体
// 移动
function moveCube() {
  cube.position.x = 4.5
}
// 旋转
function rotateCube() {
  // 从轴的正方向看，逆时针旋转为正数，顺时针为负数
  // 或者右手大拇指指向轴的正方向，四指弯曲方向为正方向
  // cube.rotation.x = Math.PI / 4
  cube.rotation.set(Math.PI / 4, 0, 0)
}
// 放缩
function scaleCube() {
  cube.scale.set(2, 1, 1)
}
```

#### 展示坐标轴

为了更直观的展示物体在三维坐标中的位置，可把坐标轴添加到场景中：

```ts
function helloThree() {
  const { scene, controls } = initScene()
  cube = createCube()
  scene.add(cube)
  scene.add(createAxesHelper(4))
  // 操作物体
  moveCube()
  rotateCube()
  scaleCube()
}

function createAxesHelper(len: number) {
  return new THREE.AxesHelper(len)
}
```

在 Threejs 中，使用的是右手坐标系，这是计算机图形学中最常用的坐标系系统。

X轴水平向右，Y轴垂直向上，Z轴垂直屏幕向外。理解这个坐标系对于正确放置物体、设置相机和进行3D变换至关重要。

```bash
    Y
    ↑
    |
    +----→ X
   /
  Z
```

坐标轴在 Threejs 中被视为特殊的物体，也能随着相机的移动，可观察不同视角的样子，但是其他物体的位置还是以原点作为参照。

绕轴旋转：绕某条转旋转，右手握住该轴，大拇指指向正方向，四指弯曲方向为旋转正方向。

### 创建一个六面颜色都不同的立方体

```ts
function createColorfulCube() {
  const boxWidth = 2
  const boxHeight = 2
  const boxDepth = 2
  // 立方体
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth)
  // 材质
  const colors = ['red', 'pink', 'green', 'white', 'blue', 'yellow']
  // 使用六个颜色创建6个材质对象，x 正轴的面 x 负轴的面 y 正轴的面 y 负轴的面 z 正轴的面 x 负轴的面
  const materials = colors.map(color => new THREE.MeshBasicMaterial({ color }))
  // 创建网格物体对象
  const cube = new THREE.Mesh(geometry, materials)
  return cube
}
```

创建多个随机颜色和大小的 cube:

```ts
function createCubes(size: number = 10) {
  const cubes = Array.from({ length: size }).map(() => {
    const color = `#${Math.random().toString(16).slice(3, 9)}`
    const size = {
      width: randomNum(1),
      height: Math.random() * 10,
      deep: Math.random() * 5,
    }
    const position = {
      x: randomNum(1),
      y: Math.random() * 4,
      z: Math.random() * 6,
    }
    const geometry = new THREE.BoxGeometry(size.width, size.height, size.deep)
    // 材质
    const material = new THREE.MeshBasicMaterial({ color })
    // 创建网格物体对象
    const cube = new THREE.Mesh(geometry, material)
    cube.position.set(position.x, position.y, position.z)
    return cube
  })
  return cubes
}
```

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

调用 addDebugGUI 传入参数，就看到调试组件了。

更多高级功能可查阅 [API文档](https://github.com/dataarts/dat.gui/blob/master/API.md) 或者 AI 工具。

### 类似的库还有哪些？

`lil-gui`、`Tweakpane`。
