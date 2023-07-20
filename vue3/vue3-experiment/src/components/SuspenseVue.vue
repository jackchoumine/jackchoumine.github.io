<template>
  <h1>Supense</h1>
  <Suspense>
    <template #default>
      <AsyncComponent :timeout="3000" />
    </template>
    <template #fallback>
      <h1>加载中</h1>
    </template>
  </Suspense>
</template>

<script>
//TODO 没有渲染出来
import AsyncComponent from './AsyncComponent.vue'
export default {
  name: 'SuspenseVue',
  components: {
    AsyncComponent,
  },
}
</script>
