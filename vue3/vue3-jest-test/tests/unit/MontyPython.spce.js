/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-24 09:09:06
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-24 09:25:44
 * @Description : 学习 jest.fn() 的使用
 */
import MontyPython from "./MontyPython";

describe("MontyPython", () => {
  it("callFnWithTheMeaningOfLife should call the provided function with the number 42", () => {
    const mockFn = jest.fn();
    const montyPython = new MontyPython();

    montyPython.callFnWithTheMeaningOfLife(mockFn);
    // expect(mockFn).toHaveBeenCalled()
    expect(mockFn).toHaveBeenCalledWith(42);
  });
});
