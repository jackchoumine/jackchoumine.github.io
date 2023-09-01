/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-31 09:48:47
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-31 10:03:56
 * @Description :
 */
import { shallowMount } from "@vue/test-utils";
import Message, { variantValidator } from "./Message.vue";

describe("Message.vue", () => {
  describe("测试props", () => {
    it("valid variant", () => {
      const validVariants = ["success", "warning", "error"];

      validVariants.forEach((value) => {
        expect(() => variantValidator(value)).not.toThrowError();
      });
    });
    it("invalid variant", () => {
      const validVariants = ["invalid"];

      validVariants.forEach((value) => {
        expect(() => variantValidator(value)).toThrowError();
      });
    });
    it("render variant", () => {
      const wrapper = shallowMount(Message, {
        props: {
          variant: "success",
        },
      });

      expect(wrapper.find("div").classes()).toContain("success");
    });
  });
});
