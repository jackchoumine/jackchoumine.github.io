/*
 * @Description : 可用性测试
 * @Date        : 2022-06-06 05:58:19 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-01-12 01:03:57 +0800
 * @LastEditors : JackChou
 */
import { sum } from "../../src/es6.sum.js";

describe("环境测试", () => {
  test("可用吗？", () => {
    expect(sum(1, 2)).toBe(3);
  });
});
