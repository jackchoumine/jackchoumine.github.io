function sleep(millisecond: number) {
  return new Promise(resolve => {
    setTimeout(resolve, millisecond)
  })
}

function loopSleep(millisecond: number, result: string) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(result)
      setTimeout(() => {
        loopSleep(millisecond, result)
      }, millisecond)
    }, millisecond)
  })
}

describe('定时器', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })
  afterEach(() => {
    jest.useRealTimers()
  })

  it('执行所有定时器', async () => {
    const fn = jest.fn()
    sleep(1000).then(fn)
    jest.runAllTimers()
    await Promise.resolve()
    expect(fn).toHaveBeenCalled()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('递归定时器', async () => {
    const result = 'hello jest'
    const res = loopSleep(1000, result)
    //jest.runAllTimers() // ❌️ 栈溢出
    jest.runOnlyPendingTimers() // 清除所有在等待中的定时器
    await expect(res).resolves.toBe(result)
  })

  it('推进时间', async () => {
    const fn = jest.fn()
    sleep(1000).then(fn)
    jest.advanceTimersByTime(1000)
    await Promise.resolve()
    expect(fn).toHaveBeenCalled()
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
