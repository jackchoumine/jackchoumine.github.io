/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-10-03 17:33:14
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-10-05 02:13:26
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
import { throttle } from 'petite-utils'
import * as THREE from 'three'
// three 为了保持内核小，仅包含场景、摄像机、渲染器、原始几何体、纹理、光照、阴影等相关的类，其他功能，比如模型加载，以插件形式提供，需要额外导入。
import { OrbitControls } from 'three/addons'

import { addDebugGUI } from './dat-gui'

let scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  controls: OrbitControls,
  cube: THREE.Mesh

const windowW = window.innerWidth
const windowH = window.innerHeight

export { init }

function init() {
  scene = new THREE.Scene()
  // field of view 视野范围，单位为角度。
  // 类似眼睛睁开大小，0 类似眼睛闭上，什么都看不到，180，就失去聚焦，也会什么都看不到。
  //  越大，视野范围越大，物体越小，通常设置为 75 度。
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
  camera.position.z = 5 // 相机位置默认在坐标原点，threejs 中使用的是右手坐标
  renderer = new THREE.WebGLRenderer({
    // 抗锯齿
    antialias: true,
  })
  renderer.setSize(windowW, windowH)
  const canvas = renderer.domElement
  document.body.appendChild(canvas)
  scene.add((cube = createCube()))
  scene.add(createAxesHelper(4))
  // 渲染函数必须放在最后
  // renderer.render(scene, camera)
  createControls()
  renderLoop()
  renderOnResize()
  // 操作物体
  moveCube()
  rotateCube()
  scaleCube()
  addDebugGUI(cube, controls)
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

/**
 * 轨道控制器：使相机围绕目标物体进行运动，以查看物体的不同位置。
 * 右键拖动，左键旋转，滚轮拉近拉远相机。
 */
function createControls() {
  // 构造函数两个参数：相机对象，用于事件监听的 dom 元素，第二个参数可选。
  controls = new OrbitControls(camera, renderer.domElement)
  // 轨道控制的属性
  // https://threejs.org/docs/#examples/zh/controls/OrbitControls
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

function createAxesHelper(len: number) {
  return new THREE.AxesHelper(len)
}

function renderOnResize() {
  window.addEventListener('resize', throttle(onWindowResize))
}

function onWindowResize() {
  // 改变画布尺寸
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 改变相机宽高比
  camera.aspect = window.innerWidth / window.innerHeight
  // camera.updateProjectionMatrix() 在相机参数改变后必须调用，以确保投影矩阵与当前参数同步，否则会出现显示异常。
  camera.updateProjectionMatrix()
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
