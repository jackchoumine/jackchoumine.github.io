<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-23 03:23:18
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-23 18:00:47
 * @Description : 
-->
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <MockModule />
  </div>
</template>

<script>
import { MockModule } from '@/components'
export default {
  name: 'AboutView',
  components: {
    MockModule,
  },
}
</script>
