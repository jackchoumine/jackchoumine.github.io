/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-10-03 17:33:14
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-10-05 12:06:22
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
import * as THREE from 'three'

import { addDebugGUI } from './dat-gui'
import { initScene } from './initScene'

let cube: THREE.Mesh

export { helloThree }

function helloThree() {
  const { scene, controls } = initScene()
  cube = createCube()
  scene.add(cube)
  scene.add(createAxesHelper(4))
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

function createAxesHelper(len: number) {
  return new THREE.AxesHelper(len)
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
