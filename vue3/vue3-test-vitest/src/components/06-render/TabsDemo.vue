<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-30 11:28:29
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-09-02 14:55:07
 * @Description :
-->
<script setup>
import { ref } from 'vue'
import { Tab, TabContainer, TabContent } from './TabContainer'
import FormTableDemo from './FormTableDemo.vue'
const activeTabId = ref('1')
const inputText = ref('')
const myInput = ref('')
</script>

<template>
  <div class="TabsDemo">
    <FormTableDemo />
    <h3>tabs demo - 301 activeTabId {{ activeTabId }}</h3>
    <TabContainer v-model="activeTabId" keep-alive>
      <p>无效的节点</p>
      <!-- 注释节点 -->
      <Tab title="Tab 1" id="1">tab 1000</Tab>
      <Tab title="Tab 2" id="2">tab 2 </Tab>
      <Tab title="Tab 3" id="3">tab 3 </Tab>
      <TabContent id="1">
        <h3>Tab 1</h3>
        <input type="text" v-model="inputText" />
        <p>Content 1</p>
      </TabContent>
      <TabContent id="2">
        <h3>Tab 2</h3>
        <p>Content 2</p>
      </TabContent>
      <TabContent id="3">
        <div>
          <input type="text" v-model="myInput" />
          <p>myInput : {{ myInput }}</p>
          <h3>Tab 3</h3>
        </div>
      </TabContent>
    </TabContainer>
  </div>
</template>

<style scoped lang="scss">
.TabsDemo {
  // scss code
}
</style>
