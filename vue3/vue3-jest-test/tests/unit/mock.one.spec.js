/*
 * @Description : mock-1
 * @Date        : 2022-06-09 17:06:26 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-01-12 01:30:02 +0800
 * @LastEditors : JackChou
 */
// import axios from 'axios'
/*
import Users from '../../src/users.js'

function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index])
  }
}

jest.mock('axios')

describe('forEach', () => {
  test('forEach', () => {
    const mockCallback = jest.fn(x => 42 + x)
    forEach([0, 1], mockCallback)
    // 此 mock 函数被调用了两次
    expect(mockCallback.mock.calls.length).toBe(2)

    // 第一次调用函数时的第一个参数是 0
    expect(mockCallback.mock.calls[0][0]).toBe(0)

    // 第二次调用函数时的第一个参数是 1
    expect(mockCallback.mock.calls[1][0]).toBe(1)

    // 第一次函数调用的返回值是 42
    expect(mockCallback.mock.results[0].value).toBe(42)
    const myMock1 = jest.fn()
    const a = new myMock1()
    a.name = 'a'
    console.log(myMock1.mock.instances) //  [ mockConstructor { name: 'a' } ]
    // > [ <a> ]

    const myMock2 = jest.fn()
    const b = { name: 'b' }
    const bound = myMock2.bind(b)
    bound()
    console.log(myMock2.mock.contexts) //  [ { name: 'b' } ]

    const myMock = jest.fn()
    console.log(myMock())
    // > undefined

    myMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true)

    console.log(myMock(), myMock(), myMock(), myMock())
    //10 x true true // 返回值保留著最后一个

    const filterTestFn = jest.fn()

    // Make the mock return `true` for the first call,
    // and `false` for the second call
    filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false)

    const result = [11, 12].filter(num => filterTestFn(num))

    console.log(result)
    // > [11]
    console.log(filterTestFn.mock.calls[0][0]) // 11
    console.log(filterTestFn.mock.calls[1][0]) // 12
  })
  test('should fetch users', () => {
    const users = [{ name: 'Bob' }]
    const resp = { data: users }
    axios.get.mockResolvedValue(resp)

    // or you could use the following depending on your use case:
    // axios.get.mockImplementation(() => Promise.resolve(resp))

    return Users.all().then(data => expect(data).toEqual(users))
  })
})
*/
it("hello", () => {});
