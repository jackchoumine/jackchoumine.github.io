<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-21 08:47:44
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-31 10:13:42
 * @Description : 
-->
<template>
  <HelloWorld msg="Welcome to Your Vue.js App" />
  <Message variant="hello" />
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import { Message } from "./components";
export default {
  name: "App",
  components: {
    HelloWorld,
    Message,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
