<template>
  <FadeIn appear>
    <img :src="src" v-bind="$attrs" />
  </FadeIn>
</template>

<script>
import FadeIn from './FadeInTransition'
export default {
  name: 'Image',
  components: {
    FadeIn,
  },
  inheritAttrs: false,
  props: {
    src: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped></style>
