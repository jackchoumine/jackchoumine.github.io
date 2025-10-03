/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-10-03 17:33:14
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-10-03 18:14:08
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
import * as THREE from 'three'

let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer

export { init }

function init() {
  scene = new THREE.Scene()
  // field of view 视野范围，单位为角度。
  // 类似眼睛睁开大小，0 类似眼睛闭上，什么都看不到，180，就失去聚焦，也会什么都看不到。
  //  越大，视野范围越大，物体越小，通常设置为 75 度。
  const fov = 75
  // 宽高比，默认为 2
  // 宽高比会影响图形拉伸、压缩。通常设置和画布的宽高比相同，保证不会压缩或者横向拉伸。
  const aspect = window.innerWidth / window.innerHeight
  const near = 0.1 // 近平面到相机的距离
  const far = 1000 // 远平面到相机的距离
  // 以上参数确定后，视野范围限制在一个四棱台内，在图形学里叫视锥体。
  // 小于或者大于这两个距离的物体，会被剔除，即不绘制，这叫视锥体剔除技术。
  // https://threejs.org/manual/resources/frustum-3d.svg
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.z = 5 // 相机位置默认在坐标原点，threejs 中使用的是右手坐标
  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  const canvas = renderer.domElement
  document.body.appendChild(canvas)
  scene.add(createCube())
  // 渲染函数必须放在最后
  renderer.render(scene, camera)
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
