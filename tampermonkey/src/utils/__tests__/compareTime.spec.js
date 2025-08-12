/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-08-12 23:10:28
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-08-12 23:12:46
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
// compareTime.test.ts
import { describe, it, expect } from 'vitest'
import { compareTime } from '../compareTime'

describe('compareTime', () => {
  describe('有效时间比较', () => {
    it('应该正确比较相同时间', () => {
      expect(compareTime('2024-02-01T12:04:56.968Z', '2024-02-01T12:04:56.968Z')).toBe(0)
    })

    it('应该识别较早的时间', () => {
      expect(compareTime('2024-01-01T00:00:00.000Z', '2024-02-01T12:04:56.968Z')).toBe(-1)
    })

    it('应该识别较晚的时间', () => {
      expect(compareTime('2024-03-01T12:04:56.968Z', '2024-02-01T12:04:56.968Z')).toBe(1)
    })

    it('应该比较毫秒级差异', () => {
      expect(compareTime('2024-02-01T12:04:56.969Z', '2024-02-01T12:04:56.968Z')).toBe(1)
      expect(compareTime('2024-02-01T12:04:56.967Z', '2024-02-01T12:04:56.968Z')).toBe(-1)
    })

    it('应该比较不同时区的时间', () => {
      // 这些时间实际上表示同一时刻
      expect(compareTime('2024-02-01T12:04:56.968Z', '2024-02-01T13:04:56.968+01:00')).toBe(0)
      expect(compareTime('2024-02-01T07:04:56.968-05:00', '2024-02-01T12:04:56.968Z')).toBe(0)
    })
  })

  describe('边界情况', () => {
    it('应该处理最小和最大日期', () => {
      expect(compareTime('1970-01-01T00:00:00.000Z', '2024-02-01T12:04:56.968Z')).toBe(-1)
      expect(compareTime('275760-09-13T00:00:00.000Z', '2024-02-01T12:04:56.968Z')).toBe(1)
    })

    it('应该处理闰秒', () => {
      // 注意: JavaScript Date 实际上不处理闰秒
      expect(compareTime('2016-12-31T23:59:60.000Z', '2017-01-01T00:00:00.000Z')).toBe(-1)
    })
  })

  describe.skip('错误处理', () => {
    it('应该对无效时间格式抛出错误', () => {
      expect(() => compareTime('invalid-date', '2024-02-01T12:04:56.968Z')).toThrowError(
        '无效的时间格式',
      )
      expect(() => compareTime('2024-02-01T12:04:56.968Z', 'not-a-date')).toThrowError(
        '无效的时间格式',
      )
    })

    it('应该对部分无效时间抛出错误', () => {
      expect(() => compareTime('2024-13-01T12:04:56.968Z', '2024-02-01T12:04:56.968Z')).toThrow()
      expect(() => compareTime('2024-02-30T12:04:56.968Z', '2024-02-01T12:04:56.968Z')).toThrow()
    })
  })

  describe('实际应用场景', () => {
    it('应该正确排序时间数组', () => {
      const times = [
        '2024-02-01T12:04:56.968Z',
        '2023-01-15T08:30:00.000Z',
        '2024-02-01T12:04:56.967Z',
        '2024-01-31T23:59:59.999Z',
      ]

      const sorted = [...times].sort((a, b) => compareTime(a, b))
      const expected = [
        '2023-01-15T08:30:00.000Z',
        '2024-01-31T23:59:59.999Z',
        '2024-02-01T12:04:56.967Z',
        '2024-02-01T12:04:56.968Z',
      ]

      expect(sorted).toEqual(expected)
    })

    it('应该正确处理数据库时间戳', () => {
      const dbTimestamps = [
        '2024-02-01T12:04:56.968Z',
        '2024-02-01T12:04:56.968Z', // 完全相同的重复时间
        '2024-02-01T12:04:56.967Z',
      ]

      // 查找最新时间
      const latest = dbTimestamps.reduce((prev, current) =>
        compareTime(prev, current) >= 0 ? prev : current,
      )
      expect(latest).toBe('2024-02-01T12:04:56.968Z')
    })
  })
})
