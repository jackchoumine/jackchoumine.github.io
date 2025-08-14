/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-08-12 22:25:19
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-08-12 22:25:38
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
/**
 * 比较两个 npm 版本号。
 *
 * 如果 versionA > versionB，返回 1
 * 如果 versionA < versionB，返回 -1
 * 如果 versionA == versionB，返回 0
 *
 * @param {string} versionA 第一个版本号
 * @param {string} versionB 第二个版本号
 * @returns {number} 比较结果
 */
function compareVersions(versionA, versionB) {
  // 1. 将版本字符串拆分为主要、次要、修订和预发布部分
  const aParts = versionA.split('-')
  const bParts = versionB.split('-')

  // 2. 将主要、次要、修订版本号字符串转换为数字数组
  const aNums = aParts[0].split('.').map(Number)
  const bNums = bParts[0].split('.').map(Number)

  // 3. 比较主要、次要和修订版本号
  for (let i = 0; i < Math.max(aNums.length, bNums.length); i++) {
    const a = aNums[i] || 0
    const b = bNums[i] || 0
    if (a > b) return 1
    if (a < b) return -1
  }

  // 4. 比较预发布版本（如果有）
  // 预发布版本号比正式版本号小
  if (aParts.length > 1 && bParts.length === 1) {
    return -1
  }
  if (aParts.length === 1 && bParts.length > 1) {
    return 1
  }

  // 如果两个版本都有预发布标签，则进行比较
  if (aParts.length > 1 && bParts.length > 1) {
    const aPre = aParts[1].split('.').map((part) => (isNaN(part) ? part : Number(part)))
    const bPre = bParts[1].split('.').map((part) => (isNaN(part) ? part : Number(part)))

    for (let i = 0; i < Math.max(aPre.length, bPre.length); i++) {
      const a = aPre[i]
      const b = bPre[i]

      // 如果一个部分是数字，另一个是字符串，字符串更小
      if (typeof a === 'string' && typeof b === 'number') return -1
      if (typeof a === 'number' && typeof b === 'string') return 1

      if (a > b) return 1
      if (a < b) return -1
    }
  }

  // 5. 如果所有部分都相同，则版本号相等
  return 0
}
