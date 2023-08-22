<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-10 11:04:16
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-22 15:24:12
 * @Description : 
-->
<script>
import ModalDemo from './ModalDemo.vue';

export default {
    name: 'ParentModal',
    data() {
        return {
            show: true
        }
    },
    methods: {
        onCloseModal() {
            this.show = false;
        }
    },
    components: { ModalDemo }
}
</script>

<template>
  <ModalDemo @close-modal="onCloseModal" v-if="show" />
</template>
