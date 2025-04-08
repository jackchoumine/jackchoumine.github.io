import { expect } from 'vitest'

expect.extend({
  toBeNullish(received) {
    const isNullish = received == null // null 和 undefined 都会返回 true
    return {
      pass: isNullish,
      message: () =>
        `expected to be null or undefined, but got ${this.utils.printReceived(received)}`,
    }
  },
  toBePaginationRes(received) {
    let isValid = false
    const { rows, total, pageNow, pageSize } = received ?? {}
    isValid =
      Array.isArray(rows) &&
      typeof total === 'number' &&
      typeof pageNow === 'number' &&
      typeof pageSize === 'number'

    return {
      pass: isValid,
      message: () =>
        `expected ${this.utils.printReceived(received)} 符合分页接口返回的返回格式`,
    }
  },
})
