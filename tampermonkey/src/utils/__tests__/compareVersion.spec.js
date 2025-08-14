/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-08-12 22:28:04
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-08-12 23:09:44
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
import { describe, it, expect } from 'vitest'
import { compareVersion } from '../compareVersion.js'

describe('compareVersion', () => {
  // --- 1. 正常版本号比较 ---
  it('应该正确比较标准版本号', () => {
    // 基础比较
    expect(compareVersion('1.0.0', '1.0.0')).toBe(0)
    expect(compareVersion('1.0.1', '1.0.0')).toBe(1)
    expect(compareVersion('1.1.0', '1.0.0')).toBe(1)
    expect(compareVersion('2.0.0', '1.0.0')).toBe(1)

    // 逆向比较
    expect(compareVersion('1.0.0', '1.0.1')).toBe(-1)
    expect(compareVersion('1.0.0', '1.1.0')).toBe(-1)
    expect(compareVersion('1.0.0', '2.0.0')).toBe(-1)
  })

  it('应该处理不同长度的版本号', () => {
    // 补全缺失的0
    expect(compareVersion('1.2', '1.2.0')).toBe(0)
    expect(compareVersion('1.2.0', '1.2')).toBe(0)
    expect(compareVersion('1.2.1', '1.2')).toBe(1)
    expect(compareVersion('1.2', '1.2.1')).toBe(-1)
  })

  // --- 2. 预发布版本号比较 ---
  it('预发布版本应该小于同级别的正式版本', () => {
    expect(compareVersion('1.0.0-alpha', '1.0.0')).toBe(-1)
    expect(compareVersion('1.0.0', '1.0.0-beta')).toBe(1)
  })

  it('应该正确比较不同的预发布标识符', () => {
    // 字母顺序比较
    expect(compareVersion('1.0.0-alpha', '1.0.0-beta')).toBe(-1)
    expect(compareVersion('1.0.0-rc', '1.0.0-beta')).toBe(1)
  })

  it('应该正确比较预发布标识符中的数字', () => {
    // 数字按值比较
    expect(compareVersion('1.0.0-alpha.1', '1.0.0-alpha.2')).toBe(-1)
    expect(compareVersion('1.0.0-alpha.10', '1.0.0-alpha.2')).toBe(1)
    expect(compareVersion('1.0.0-alpha.0', '1.0.0-alpha.0')).toBe(0)
  })

  it('应该正确处理混合标识符（数字和字符串）', () => {
    // 数字标识符的优先级低于字符串标识符
    expect(compareVersion('1.0.0-alpha.0', '1.0.0-alpha.beta')).toBe(-1)
    expect(compareVersion('1.0.0-alpha.beta', '1.0.0-alpha.0')).toBe(1)
  })

  it('应该正确比较复杂的预发布版本', () => {
    expect(compareVersion('1.0.0-alpha', '1.0.0-alpha.1')).toBe(-1)
    expect(compareVersion('1.0.0-beta.2', '1.0.0-beta.11')).toBe(-1)
    expect(compareVersion('1.0.0-rc.1', '1.0.0-beta.2')).toBe(1)
  })
})
