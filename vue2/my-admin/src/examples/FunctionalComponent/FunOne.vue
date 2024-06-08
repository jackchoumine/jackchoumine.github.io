<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-06-08 20:11:11
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-06-08 20:15:26
 * @Description : 使用模板定义函数式组件
-->
<template functional>
  <div>
    <h3>{{ props.title }}</h3>
    <p>通过组件的$options 属性调用组件方法: {{ $options.fullName(props) }}</p>
  </div>
</template>

<script>
export default {
  name: 'FunOne',
  props: {
    title: [String],
  },
  fullName(props) {
    return props.title + 'jack' + 'chou'
  },
}
</script>
