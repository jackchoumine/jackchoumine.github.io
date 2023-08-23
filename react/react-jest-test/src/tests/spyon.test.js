/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-23 23:05:42
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-23 23:06:52
 * @Description :
 */
test('test spyOn', function () {
  const obj = {
    run(spreed) {
      return `奔跑速度${spreed}m/s`
    },
    jest.spyOn(obj,'run')
  }
})
