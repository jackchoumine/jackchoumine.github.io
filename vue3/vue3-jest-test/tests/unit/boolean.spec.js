/*
 * @Description : 真值假值测试
 * @Date        : 2022-06-07 06:36:09 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-06-09 17:22:09 +0800
 * @LastEditors : JackChou
 */
test("city database has Vienna", () => {
  expect("Vienna").toBeTruthy();
});
/*
describe('describe 1', () => {
  beforeAll(() => {
    console.log('beforeAll ---1')
  })

  afterAll(() => {
    console.log('afterAll ---1')
  })

  beforeEach(() => {
    console.log('beforeEach ----- 1')
  })

  afterEach(() => {
    console.log('afterEach ----- 1')
  })

  test('city database has Vienna', () => {
    expect('Vienna').toBeTruthy()
  })
})

describe('真值假值测试', () => {
  beforeAll(() => {
    console.log('beforeAll')
  })

  afterAll(() => {
    console.log('afterAll')
  })

  beforeEach(() => {
    console.log('beforeEach')
  })
  afterEach(() => {
    console.log('afterEach')
  })
  test('真值？', () => {
    expect(true).toBeTruthy()
    expect('0').toBeTruthy()
    expect(1).toBeTruthy()
    expect(100).toBeTruthy()
    expect({}).toBeTruthy()
    expect([]).toBeTruthy()
  })

  // test('假值？', () => {
  //   expect(false).toBeFalsy()
  //   expect('').toBeFalsy()
  //   expect(0).toBeFalsy()
  //   expect(0).toBeFalsy()
  //   expect({}).not.toBeFalsy()
  //   expect([]).not.toBeFalsy()
  // })
})

describe('describe outer', () => {
  console.log('describe outer-a')

  describe('describe inner 1', () => {
    console.log('describe inner 1')

    test('test 1', () => console.log('test 1'))
  })

  console.log('describe outer-b')

  test.only('test only', () => console.log('test only'))
  test('test 2', () => console.log('test 2'))

  describe('describe inner 2', () => {
    console.log('describe inner 2')

    test('test 3', () => console.log('test 3'))
  })

  console.log('describe outer-c')
})
*/
