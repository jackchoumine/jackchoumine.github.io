<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-23 03:23:18
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-25 15:58:31
 * @Description : 
-->
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!-- <MockModule /> -->
    <FormDemo />
  </div>
</template>

<script>
import { MockModule } from '@/components'
import FormDemo from '@/components/FormDemo.vue';
export default {
  name: 'AboutView',
  components: {
    MockModule,
    FormDemo
  },
}
</script>
