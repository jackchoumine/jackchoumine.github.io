<script setup>
// TODO
</script>

<template>
  <div class='TestLayer'>
    <h3>layer</h3>
    <div class="box">
      <p>This is a sample text.</p>
    </div>
  </div>
</template>

<style  lang="scss">
// @import './import.css';
@layer component-1,component,importLayer;

// @import './import.css';
@import url('./import.css') layer(importLayer);


@layer component {
  .box p {
    background-color: lightblue;
    font-size: 25px;
    color: red;
  }
}

@layer component-1 {
  .box p {
    color: blue;
  }
}
</style>
