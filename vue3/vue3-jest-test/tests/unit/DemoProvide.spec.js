/*
 * @Description : 测试 provide 和 inject
 * @Date        : 2022-10-29 20:42:35 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-10-29 20:46:01 +0800
 * @LastEditors : JackChou
 */
import { mount } from "@vue/test-utils";
import DemoProvide from "./DemoProvide.vue";
import { createStore } from "vuex";

function createLocalStore() {
  const store = createStore({
    state() {
      return { count: 0 };
    },
    mutations: {
      add(state) {
        state.count += 1;
      },
    },
  });
  return store;
}
function factory() {
  const store = createLocalStore();
  return mount(DemoProvide, {
    global: {
      provide: {
        store,
      },
    },
  });
}

describe("DemoProvide", () => {
  it("测试inject", async () => {
    const wrapper = factory();
    const button = wrapper.find("button");
    await button.trigger("click");
    await button.trigger("click");
    expect(wrapper.find("button").text()).toBe("2");
  });
});
