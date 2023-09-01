/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-21 08:47:44
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-22 14:46:58
 * @Description : 测试元素可见性和存在性
 */
import { shallowMount } from "@vue/test-utils";
import Condition from "./Condition.vue";

describe("Condition.vue", () => {
  it("admin 存在", () => {
    const wrapper = shallowMount(Condition);

    expect(wrapper.find("#admin").exists()).toBe(true);
  });

  it("admin 不存在", () => {
    const wrapper = shallowMount(Condition, {
      data() {
        return {
          admin: false,
        };
      },
    });

    expect(wrapper.find("#admin").exists()).toBe(false);
  });

  it("dev 不可见", () => {
    const wrapper = shallowMount(Condition);

    expect(wrapper.find("#dev").isVisible()).toBe(false);
  });
  it("dev 可见", () => {
    const wrapper = shallowMount(Condition, {
      data() {
        return { dev: true };
      },
    });

    expect(wrapper.find("#dev").exists()).toBe(true);
    expect(wrapper.find("#dev").isVisible()).toBe(true);
  });
  it("opacity 0 不可见", () => {
    const wrapper = shallowMount(Condition);

    expect(wrapper.find("#opacity").exists()).toBe(true);
    expect(wrapper.find("#opacity").isVisible()).toBe(false);
  });
  it("opacity 非 0  可见", () => {
    const wrapper = shallowMount(Condition, {
      data: () => {
        return {
          opacity: 0.1,
        };
      },
    });

    expect(wrapper.find("#opacity").exists()).toBe(true);
    expect(wrapper.find("#opacity").isVisible()).toBe(true);
  });
  it("attributes()", () => {
    const wrapper = shallowMount(Condition, {
      data: () => {
        return {
          opacity: 0.1,
        };
      },
    });

    expect(wrapper.find("#opacity").attributes()).toEqual(
      expect.objectContaining({
        style: "opacity: 0.1;",
      })
    );
    expect(wrapper.find("#opacity").attributes("style")).toBe("opacity: 0.1;");
  });
  it("classes()", () => {
    const wrapper = shallowMount(Condition, {
      data: () => {
        return {
          opacity: 0.1,
        };
      },
    });

    expect(wrapper.find("#opacity").classes()).toContain("opacity-button");
    expect(wrapper.find("#opacity").classes().toString()).toMatch("hello");
    expect(wrapper.find("#opacity").classes("hello")).toBe(true);
  });
});
