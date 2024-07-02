<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-11-06 12:17:37
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-06-24 02:57:26
 * @Description : 异步组件
-->
<script setup>
const rightComponent = shallowRef()
const menuList = [
  {
    label: '菜单1',
    // path: () => import('./MenuList/TestOne.vue'),
    isActive: true,
    path: defineAsyncComponent(() => import('./MenuList/TestOne.vue')),
  },
  {
    label: '菜单2',
    // path: () => import('./MenuList/TestTwo.vue'),
    path: defineAsyncComponent(() => import('./MenuList/TestTwo.vue')),
  },
]

onSelectMenu(menuList[0])

function onSelectMenu(menu) {
  //   import(menu.path).then(component => {
  //     rightComponent.value = component.default
  //   })
  //   menu.path().then(component => {
  //     rightComponent.value = component.default
  //   })
  rightComponent.value = menu.path
}
</script>
<template>
  <div>
    <nav class="left">
      <ul>
        <li v-for="menu in menuList" :key="menu.path" @click="onSelectMenu(menu)">
          {{ menu.label }}
        </li>
      </ul>
    </nav>
    <div class="right">
      <!--  v-if="rightComponent" -->
      <Component :is="rightComponent" />
    </div>
  </div>
</template>
