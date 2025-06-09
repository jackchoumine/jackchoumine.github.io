<script lang="ts" setup>
import { useMitt } from '@/hooks'

const { payload } = useMitt('user:login')
</script>

<template>
  <div class="standalone">
    <h4>定义方式2: defineAsyncComponent(()=>import(component/path))</h4>
    <p>user:login : {{ payload }}</p>
  </div>
</template>

<style scoped lang="scss">
.standalone {
  // scss code
}
</style>
