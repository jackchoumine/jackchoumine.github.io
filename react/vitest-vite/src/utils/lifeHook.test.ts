import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms, ms))
}

beforeEach(() => {
  vi.useFakeTimers()
})
afterEach(() => {
  vi.useRealTimers()
})

describe('使用生命周期函数', () => {
  it('测试1', async () => {
    const p = delay(1000).then(() => '0')
    vi.advanceTimersByTime(1100)

    await expect(p).resolves.toBe('0')
  })

  it('测试2', async () => {
    const p = delay(2000)
    vi.advanceTimersByTime(2000)

    await expect(p).resolves.toEqual(expect.anything())
  })
})
