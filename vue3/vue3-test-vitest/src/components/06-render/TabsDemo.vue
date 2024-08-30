<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-30 11:28:29
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-30 12:36:48
 * @Description :
-->
<script setup>
import { ref } from 'vue'
import { Tab, TabContainer, TabContent } from './TabContainer.js'
const activeTabId = ref('1')
</script>

<template>
  <div class="TabsDemo">
    <h3>tabs demo - 301 activeTabId {{ activeTabId }}</h3>
    <TabContainer v-model="activeTabId">
      <p>无效的节点</p>
      <!-- 注释节点 -->
      <Tab title="Tab 1" id="1">tab 1000</Tab>
      <Tab title="Tab 2" id="2">tab 2 </Tab>
      <Tab title="Tab 3" id="3">tab 3 </Tab>
      <TabContent id="1">
        <h3>Tab 1</h3>
        <p>Content 1</p>
      </TabContent>
      <TabContent id="2">
        <h3>Tab 2</h3>
        <p>Content 2</p>
      </TabContent>
      <TabContent id="3">
        <h3>Tab 3</h3>
        <p>Content 3</p>
      </TabContent>
    </TabContainer>
  </div>
</template>

<style scoped lang="scss">
.TabsDemo {
  // scss code
}
</style>
