<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-10-17 11:26:07
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-10-17 11:34:08
 * @Description : 点击时再加载
-->
<script setup>
const props = defineProps(['onClose'])
</script>

<template>
  <div class="popup">
    <div class="content">
      <h4>Login to your account</h4>
      <input type="text" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button @click="props.onClose">Log in</button>
    </div>
  </div>
</template>

<style scoped>
.popup {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 0.2);
}

.content {
  width: 30%;
  min-width: 200px;
  height: 200px;
  padding: 10px;
  background: #fff;
  border-radius: 5px;
}

input[type='text'],
input[type='password'] {
  width: 80%;
  margin: 0 auto;
  border: 0;
  font-size: 0.5em;
  outline: 0;
  border-bottom: 1px solid #eee;
}

button {
  margin-top: 50px;
  padding: 5px 10px;
  border: 0;
  font-size: 0.5em;
  color: #fff;
  background-color: #8e44ad;
}
</style>
