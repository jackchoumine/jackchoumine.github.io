import MontyPython from './MontyPython'

describe('MontyPython', () => {
  test('callFnWithTheMeaningOfLife should call the provided function with the number 42', () => {
    const mockFn = jest.fn()
    const montyPython = new MontyPython()

    montyPython.callFnWithTheMeaningOfLife(mockFn)

    expect(mockFn).toHaveBeenCalledWith(42)
  })
})
