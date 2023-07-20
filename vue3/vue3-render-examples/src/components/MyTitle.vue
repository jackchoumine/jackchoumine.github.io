<template>
  <div>
    <h1>{{ $props.title }}</h1>
    <button @click="$attrs.onMyClick && $attrs.onMyClick(Math.random().toString(36))">点击</button>
    <p>$attrs{{ $attrs }}</p>
  </div>
</template>

<script>
export default {
  name: 'FunOne',
  props: {
    title: [String],
  },
  //NOTE 模板定义的函数式组件的事件 不用声明
  // emits: ['my-click'],
}
</script>
