# jest 学习

## 常见断言

| 场景         | 断言api                                                                                                                              |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| 基础类型比较 | `not`、`toBe(value)`、`toBeTruthy(value)`、`toBeFalsy(value)`、`toBeDefined()`、`toBeUndefined()`、`toBeCloseTo(value)`、`toBeNaN()` |
| 引用类型比较 | `equal(value)`                                                                                                                       |
| 数字符号     | toBeGreaterThan(value) toBeLessThan(value) toBeGreaterThanOrEqual(value) toBeLessThanOrEqual(value) toBeCloseTo(value)               |
| 正则匹配     | toMatch(value) toMatchObject(value)                                                                                                  |
| 表单验证     | toContain(value) arrayContaining(value) toContainEqual(value) toHaveLength(value) toHaveProperty(value)                              |
| 错误抛出     | toThrow() toThrowError()                                                                                                             |

> toEqual 会递归的比较每个属性。
