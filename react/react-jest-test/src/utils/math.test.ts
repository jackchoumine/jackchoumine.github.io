import * as math from './math'

jest.mock('./math', () => {
  return {
    ...jest.requireActual('./math'),
    subtract: jest.fn(),
  }
})
const mockMath = math as jest.Mocked<typeof math>
describe('math.ts', () => {
  it('should add two numbers', () => {
    expect(math.sum(1, 2)).toBe(3)
  })
  it('重新实现 subtract 1', () => {
    mockMath.subtract.mockReturnValueOnce(1)
    expect(math.subtract(1, 2)).toBe(1)
  })
  it('重新实现 subtract 2', () => {
    mockMath.subtract.mockImplementationOnce((a, b) => a + b)
    expect(math.subtract(1, 2)).toBe(3)
  })
})
