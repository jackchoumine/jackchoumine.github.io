<!--
 * @Description : 
 * @Date        : 2021-11-22 04:03:10 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-01-03 17:26:50 +0800
 * @LastEditors : JackChou
-->
<template>
  <div>
    <span class="rating">{{ msg }}</span>
    <my-rating
      ref="myRating"
      :max-value="maxValue"
      :value="value"
      is-show
      :person="person"
      :personArray="persons"
      @rating-change="ratingChange"
    />
    <!-- 无法监听事件 -->
    <button @click="changeRating">changeRating</button>
  </div>
</template>

<script>
export default {
  name: 'TestStencil',
  data() {
    return {
      msg: 'Hello web components in stencil---33',
      maxValue: 5,
      value: 2,
      person: {
        name: 'Jack',
        age: 18,
      },
      persons: [{ name: 'jack', age: 30 }],
    }
  },
  mounted() {
    console.log('Home mounted')
    const myRatingComponent = document.querySelector('my-rating')
    setTimeout(() => {
      // myRatingComponent.value = 4;
      myRatingComponent.setAttribute('value', 4)
      console.log('set value')
      this.maxValue = 10
      myRatingComponent.getValue({ maxValue: 10, value: 5 }).then((value) => {
        console.log('get value', value)
      })
      console.log(this.$refs.myRating)
    }, 2000)

    this.$refs.myRating.addEventListener('ratingChange', ({ detail }) => {
      console.log('rating changed', detail)
      // alert(`rating change ${detail.value}`)
    })
  },
  methods: {
    showConfirm() {
      // TODO如何知道用户点了确定或者取消？
      this.$myConfirm('删除后不能恢复', '确定删除吗？')
    },
    changeRating() {
      this.value = Math.floor(Math.random() * this.maxValue)
      const person = { age: 30 * Math.random(), name: 'hello' }
      this.persons = [...this.persons, person]
      this.person = person
      // this.persons
    },
    ratingChange({ detail }) {
      console.log('rating changed', detail)
      alert(`rating change ${detail.value}`)
    },
  },
}
</script>

<style></style>
