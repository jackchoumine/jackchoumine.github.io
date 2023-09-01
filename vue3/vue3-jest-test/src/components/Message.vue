<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-31 09:42:13
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-09-01 09:25:31
 * @Description : 
-->
<script>
export const variantValidator = (value) => {
  if (!["success", "warning", "error"].includes(value)) {
    // throw Error(`variant is required and must
    //  be either 'success', 'warning or 'error'.
    //  You passed ${value}`)
    console.warn(`variant is required and must be either 'success', 'warning or 'error'.
        You passed ${value}`);
  }
  return true;
};

export default {
  name: "Message",
  props: {
    variant: {
      required: true,
      type: String,
      validator: variantValidator,
    },
    message: {
      type: String,
      validator: (value) => {
        if (!value) {
          console.warn("message 是必需的。");
          return false;
        }
        return true;
      },
    },
  },
};
</script>

<template>
  <div :class="variant">validator</div>
</template>

<style scoped>
.message {
}
</style>
