<!--
 * @Description : 
 * @Date        : 2022-10-29 20:09:32 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-10-29 20:26:24 +0800
 * @LastEditors : JackChou
-->
<template>
  <button @click="add">{{ count }}</button>
  <div>
    postId:
    {{ postId }}
  </div>
</template>

<script>
// import { computed } from 'vue'
// import { useStore } from 'vuex'
export default {
  name: 'Counter',
  components: {},
  computed: {
    postId() {
      return this.$router.params.postId
    },
    count() {
      return this.$store.state.count
    },
  },
  methods: {
    add() {
      this.$store.commit('add')
    },
  },
  // setup(props, { emit, attrs, slots }) {
  //   const store = useStore()
  //   const count = computed(() => {
  //     return store.state.count
  //   })
  //   function add() {
  //     store.commit('add')
  //   }
  //   return { count, add }
  // },
}
</script>

<style scoped lang="scss"></style>
