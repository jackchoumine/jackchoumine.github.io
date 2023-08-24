/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-24 09:06:11
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-24 09:06:23
 * @Description :
 */
export default class MontyPython {
  callFnWithTheMeaningOfLife(fn) {
    fn(42)
  }
  getTheMeaningOfLife() {
    return Math.random() * 100
  }
}
