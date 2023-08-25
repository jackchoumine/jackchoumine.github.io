/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-23 23:05:42
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-24 23:09:50
 * @Description :
 */
test('test spyOn', function () {
  const obj: any = {
    run(spreed: any) {
      return `奔跑速度${spreed}m/s`
    },
  }
  jest.spyOn(obj, 'run')
})
