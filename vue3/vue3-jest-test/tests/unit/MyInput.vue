<!--
 * @Description : 
 * @Date        : 2023-01-12 00:08:30 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-01-12 00:24:47 +0800
 * @LastEditors : JackChou
-->
<template>
  <div>
    <input v-model="myInput" placeholder="请输入名字" name="name" />
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import { ref, reactive, watch, computed, defineComponent } from "vue";
export default defineComponent({
  name: "MyInput",
  props: {
    minLength: {
      type: Number,
      default: 3,
    },
  },
  setup(props, { emit, attrs, slots }) {
    const myInput = ref("");
    const error = computed(() => {
      if (myInput.value.length < props.minLength) return "名字不得少于3个字";
      return "";
    });
    return { myInput, error };
  },
});
</script>

<style scoped lang="scss"></style>
