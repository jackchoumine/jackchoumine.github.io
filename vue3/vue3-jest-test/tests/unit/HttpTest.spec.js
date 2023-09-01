/*
 * @Description : 模拟 axios 请求
 * @Date        : 2022-10-29 20:16:13 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-08-22 14:41:51
 * @LastEditors : ZhouQiJun
 */
import { shallowMount } from "@vue/test-utils";
import HttpTest from "./HttpTest.vue";

function factory() {
  return shallowMount(HttpTest, {
    global: {
      stubs: {
        subComponent: {
          template: `<span></span>`,
        },
        HelloWorld: true,
      },
    },
  });
}

let mockGet = ""; //jest.fn()

jest.mock("axios", () => {
  return { get: () => mockGet() };
});
describe("HttpTest", () => {
  // 每个 it 都会执行
  beforeEach(() => {
    mockGet = jest.fn();
  });

  it("测试 http 请求", () => {
    const wrapper = factory();
    expect(mockGet).toHaveBeenCalled();
    expect(mockGet).toHaveBeenCalledTimes(1);
  });

  it("测试自定义事件", () => {
    const wrapper = factory();
    const button = wrapper.find("button");
    button.trigger("click");
    button.trigger("click");
    console.log(wrapper.emitted());
    console.log(wrapper.emitted("my-click"));
    // NOTE 自定义事件
    expect(wrapper.emitted()).toHaveProperty("my-click");
    // NOTE 自定义事件抛出的数据
    // 第一次触发保存在 0 下标  第二次触发 保存在 1 下标
    expect(wrapper.emitted("my-click")[0]).toEqual(["hello", 123]);
    expect(wrapper.emitted("my-click")[1]).toEqual(["hello", 123]);
    // expect(wrapper.emitted()['my-click'][0][0]).toBe('hello')
  });
});
