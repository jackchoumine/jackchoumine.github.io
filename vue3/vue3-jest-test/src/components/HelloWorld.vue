<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button type="button" @click="mountModal">挂载组</button>
  </div>
</template>

<script>
import Modal from "./Modal.vue";
import { createApp } from "vue";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  setup() {
    function mountModal() {
      const div = document.createElement("div");
      div.className = "modal";
      document.body.appendChild(div);
      const modal = createApp(Modal);
      modal.mount(div);
    }
    return { mountModal };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
