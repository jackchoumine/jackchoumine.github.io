<template>
  <div>
    <LearnSlots />
    <h1>函数式组件</h1>
    <FunctionalCom></FunctionalCom>
    <h1>vue3 render exmaple</h1>
    <Model />
    <ParentButton />
    <MyButton2 buttonText="按钮" id="my-id" data-key="custom-prop" @my-click="onMyClick" :onProp="() => {}">
      <span>这是插槽</span>
    </MyButton2>
    <MyButtonRender title="title" @my-click="onMyClick">
      <template v-slot:left>
        <span>左边插槽</span>
      </template>
      <template v-slot="{ person }">
        <span>默认插槽{{ person.age }}</span>
      </template>
      <template v-slot:right="{ age }">
        <span>右边插槽{{ age }}</span>
      </template>
    </MyButtonRender>
    <MyButtonSetup title="title">
      <template v-slot:left>
        <span>左边插槽</span>
      </template>
      <template v-slot="{ person }">
        <span>默认插槽{{ person.age }}</span>
      </template>
      <template v-slot:right="{ age }">
        <span>右边插槽{{ age }}</span>
      </template>
    </MyButtonSetup>
    <MyButton title="title">
      <template v-slot:left>
        <span>左边插槽</span>
      </template>
      <template v-slot="{ person }">
        <span>默认插槽{{ person.age }}</span>
      </template>
      <template v-slot:right="{ age }">
        <span>右边插槽{{ age }}</span>
      </template>
    </MyButton>
    <MyHead :h="1" class="h1" />
    <MyHead :h="2" style="color: red" />
    <MyHead :h="3" id="h3" />
    <MyHead :h="4" data-key="my-key" />
    <MyHead :h="5" data-key="my-key" @my-event="onMyEvent">
      <template v-slot:default>
        <button>默认插槽</button>
      </template>
    </MyHead>
    <p>data form child:{{ dataFromChild }}</p>
    <hr />
    <button @click="changeSlot">修改YouHead插槽</button>
    <YouHead :h="1" @my-click="onMyClick" title="title">
      <span>默认插槽{{ dataFromChild }}</span>
      <template v-slot:right>
        <span>右边</span>
      </template>
    </YouHead>
  </div>
</template>

<script>
import { ref } from 'vue'
import LearnSlots from './components/slots/index.vue'
import FunctionalCom from './components/FunctionalCom.vue'
import Model from './components/Model.vue'
// import MyButton2 from './components/MyButton2.jsx'
import MyButton from './components/MyButton.vue'
import MyHead from './components/MyHead.vue'
import YouHead from './components/YouHead.jsx'
import MyButtonSetup from './components/MyButton.jsx'
import MyButtonRender from './components/MyButtonRender'
import ParentButton from './components/ParentButton.js'
export default {
  name: 'App',
  components: {
    LearnSlots,
    FunctionalCom,
    Model,
    ParentButton,
    //  MyButton2,
    MyButtonRender,
    MyButtonSetup,
    MyButton,
    MyHead,
    YouHead,
  },
  setup() {
    const dataFromChild = ref(Math.random().toString(36))
    const onMyEvent = data => {
      dataFromChild.value = data
    }
    const changeSlot = () => {
      dataFromChild.value = Math.random().toString(36)
    }
    const onMyClick = data => {
      console.log('my-click', data)
    }
    return {
      onMyEvent,
      dataFromChild,
      changeSlot,
      onMyClick,
    }
  },
}
</script>
