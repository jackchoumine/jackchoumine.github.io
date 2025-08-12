/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-08-12 22:54:46
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-08-12 23:09:31
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
/**
 * 比较两个语义化版本号
 * @param {string} v1 版本号1
 * @param {string} v2 版本号2
 * @returns {number} 返回比较结果：
 *   - 如果 v1 > v2，返回 1
 *   - 如果 v1 < v2，返回 -1
 *   - 如果 v1 == v2，返回 0
 */
function compareVersion(v1, v2) {
  // 解析版本号
  const parseVersion = (version) => {
    const [numbers, prerelease] = version.split('-')
    const [major, minor = '0', patch = '0'] = numbers.split('.')
    return {
      major: parseInt(major, 10),
      minor: parseInt(minor, 10),
      patch: parseInt(patch, 10),
      prerelease: prerelease ? prerelease.split('.') : [],
    }
  }

  const parsed1 = parseVersion(v1)
  const parsed2 = parseVersion(v2)

  // 比较主版本号
  if (parsed1.major !== parsed2.major) {
    return parsed1.major > parsed2.major ? 1 : -1
  }

  // 比较次版本号
  if (parsed1.minor !== parsed2.minor) {
    return parsed1.minor > parsed2.minor ? 1 : -1
  }

  // 比较修订号
  if (parsed1.patch !== parsed2.patch) {
    return parsed1.patch > parsed2.patch ? 1 : -1
  }

  // 比较预发标签
  const prerelease1 = parsed1.prerelease
  const prerelease2 = parsed2.prerelease

  // 没有预发标签的版本 > 有预发标签的版本
  if (prerelease1.length === 0 && prerelease2.length > 0) return 1
  if (prerelease1.length > 0 && prerelease2.length === 0) return -1
  if (prerelease1.length === 0 && prerelease2.length === 0) return 0

  // 逐个比较预发标签
  const maxLength = Math.max(prerelease1.length, prerelease2.length)
  for (let i = 0; i < maxLength; i++) {
    const part1 = prerelease1[i]
    const part2 = prerelease2[i]

    // 如果一个标签比另一个长
    if (part1 === undefined) return -1
    if (part2 === undefined) return 1

    // 如果两个标签都是数字
    const num1 = parseInt(part1, 10)
    const num2 = parseInt(part2, 10)
    if (!isNaN(num1)) {
      if (isNaN(num2)) return -1
      if (num1 !== num2) return num1 > num2 ? 1 : -1
    } else if (!isNaN(num2)) {
      return 1
    }

    // 如果都是字符串，按字母顺序比较
    if (part1 !== part2) {
      return part1 > part2 ? 1 : -1
    }
  }

  return 0
}

export { compareVersion }
