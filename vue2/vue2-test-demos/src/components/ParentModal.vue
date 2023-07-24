<script>
import ModalDemo from './ModalDemo.vue';
export default {
    name: 'ParentModal',
    methods: {
        onCloseModal() {
            console.log('onCloseModal');
        }
    },
    components: { ModalDemo }
}
</script>

<template>
  <ModalDemo @close-modal="onCloseModal" />
</template>
