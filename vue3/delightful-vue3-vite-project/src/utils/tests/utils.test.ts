/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-09-15 01:06:17
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-09-15 02:25:49
 * @Description :
 */
import { describe, expect, test } from 'vitest'

import { calcPlace, checkOneVar } from '@/utils/index'

describe('calcPlace function', () => {
  describe('美国地址', () => {
    describe('地址第二部分', () => {
      test('地址都有', () => {
        const locationInfo = {
          country: 'USA',
          state: 'California',
          city: 'Los Angeles',
          local: 'Santa Monica',
        }

        expect(calcPlace(locationInfo)).toEqual(
          `${locationInfo.local},${locationInfo.state}`
        )
      })
      test('缺少 state', () => {
        const locationInfo = {
          country: 'USA',
          city: 'Los Angeles',
          local: 'Santa Monica',
        }

        expect(calcPlace(locationInfo)).toEqual(
          `${locationInfo.local},${locationInfo.country}`
        )
      })
    })
    describe('地址第一部分', () => {
      test('缺少 city', () => {
        const locationInfo = {
          country: 'USA',
          local: 'Santa Monica',
        }

        expect(calcPlace(locationInfo)).toEqual(
          `${locationInfo.local},${locationInfo.country}`
        )
      })
      test('缺少 local', () => {
        const locationInfo = {
          country: 'USA',
          city: 'Los Angeles',
        }

        expect(calcPlace(locationInfo)).toEqual(
          `${locationInfo.city},${locationInfo.country}`
        )
      })
      test('缺少 local 和 city', () => {
        const locationInfo = {
          country: 'USA',
        }

        expect(calcPlace(locationInfo)).toEqual(
          `middle-of-nowhere,${locationInfo.country}`
        )
      })
    })
  })
  describe('非美国地址', () => {
    test('country 为NaN', () => {
      const locationInfo = {
        country: NaN,
        state: 'California',
        city: 'Los Angeles',
        local: 'Santa Monica',
      }

      expect(calcPlace(locationInfo)).toEqual(`${locationInfo.local},planet earth`)
    })
    test('缺少 state', () => {
      const locationInfo = {
        city: 'Los Angeles',
        local: 'Santa Monica',
      }

      expect(calcPlace(locationInfo)).toEqual(`${locationInfo.local},planet earth`)
    })
  })
})

describe('测试 checkOneVar', () => {
  it('测试字符串', () => {
    checkOneVar('hello')
    checkOneVar('1')
    checkOneVar(true)
    checkOneVar()
    checkOneVar(null)
  })
})
