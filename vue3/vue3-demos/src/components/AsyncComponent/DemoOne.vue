<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-10-17 10:35:03
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-10-17 16:29:35
 * @Description : 异步组件定义方式1
-->
<script lang="ts" setup>
import { defineAsyncComponent, ref, onErrorCaptured } from 'vue'
import ErrorComponent from './ErrorComponent.vue'
import LoadingComponent from './LoadingComponent.vue'
import AsyncSetup from './AsyncSetup.vue'

// LocalComponent 在 dev-tool 中显示为 AsyncComponentWrapper
const LocalComponent = defineAsyncComponent(
  () =>
    new Promise((resolve) => {
      resolve({
        name: 'AsyncCom',
        template: `
          <h5>
            This is a local component defined as async!
          </h5>
        `
      })
    })
)
// defineAsyncComponent 简便的接口
// StandaloneComponent 在 dev-tool 中显示为 AsyncComponentWrapper
const StandaloneComponent = defineAsyncComponent(() => import('./Standalone.vue'))
// 完整的定义方式
const CompleteDefineMethod = defineAsyncComponent({
  loader: () => import('./IAmAsyncCom.vue'),
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
  delay: 200, // default: 200 // 显示 loadingComponent 之前的等待时间
  timeout: 3000, // default: Infinity
  suspensible: false, // default: true
  // true -- 开启后优先显示 Suspense 的后备内容 loadingComponent delay errorComponent 配置被忽略。
  // 当异步组件和 Suspense 一起使用时，尤其有用
  onError(error, retry, fail, attempts) {
    // 当加载出错时，尝试再次加载。error 是错误信息 retry 是重试函数 attempts 是尝试加载的次数 fail 不再加载
    if (error.message.match(/fetch/) && attempts <= 3) {
      retry()
    } else {
      fail()
    }
  }
})
const LoginPopup = defineAsyncComponent(() => import('./LoginPopup.vue'))
const show = ref(false)
function onClose() {
  show.value = false
}
onErrorCaptured((error, instance, info) => {
  console.log(error)
  console.log(instance)
  console.log(info)
})
</script>

<template>
  <div class="demo-one">
    <h4>定义方式1: defineAsyncComponent(()=>new Promise(resolve=>{resolve(component)}))</h4>
    <LocalComponent />
    <hr />
    <StandaloneComponent />
    <hr />
    <h4>定义方式3(完整的定义方式)</h4>
    <CompleteDefineMethod />
    <h4>条件渲染触发加载异步组件</h4>
    <button @click="show = true">Login</button>
    <p>{{ show }}</p>
    <LoginPopup v-if="show" :on-close="onClose" />
    <Suspense>
      <AsyncSetup />
      <template #fallback>
        <p>todo is loading</p>
      </template>
    </Suspense>
    <!-- <component :is="LoginPopup" v-if="show" :on-close="onClose" /> -->
  </div>
</template>

<style scoped lang="scss">
.demo-one {
  // scss code
}
</style>
