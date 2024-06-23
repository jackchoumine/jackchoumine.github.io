<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-03-13 20:21:08
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-06-23 20:07:13
 * @Description : 
-->
<script setup lang="ts">
import { RouterView } from 'vue-router'

import { DialogContainer } from '@/components/PiniaDemos'
import { useEvent, useEventBus } from '@/hooks'
import { useTodosStore } from '@/stores'

import ModalContainer from './components/Modal/ModalContainer'
import { modalState } from './components/Modal/useModal'
import { generateRoutes } from './routers'
import { USER_KEY } from './utils/injectionKey'

const todosStore = useTodosStore()

// const { emit } = useEventBus()
const { on } = useEvent()
// const { on } = useEventBus()
const routes = generateRoutes()
provide(USER_KEY, { id: 1234, name: 'JackChou' })
on('ant-btn-mounted', (name: string) => {
  console.log('name', name)
})
</script>

<template>
  <ModalContainer :items="modalState.items" />
  <DialogContainer
    :dialogs="todosStore.dialog.items"
    :front-dialog="todosStore.dialog.frontDialog"
    :z-index="todosStore.dialog.zIndex" />
  <header>
    <QTabs no-caps class="bg-primary text-white shadow-2">
      <QRouteTab
        v-for="item in routes"
        :label="item.name"
        :to="item.path"
        :key="item.path"
        exact />
    </QTabs>
  </header>
  <RouterView />
</template>

<style scoped>
header {
  max-height: 100vh;
  line-height: 1.5;
}

.q-tabs {
  min-width: 100%;
}

@media (width >= 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>
