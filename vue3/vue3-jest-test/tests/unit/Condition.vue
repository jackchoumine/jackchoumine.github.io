<template>
  <button type="button">all</button>
  <button v-if="admin" type="button" id="admin">admin</button>
  <button v-show="dev" type="button" id="dev">dev</button>
</template>
<script>
export default {
  name: 'Condition',
  data() {
    return { admin: true, dev: false }
  },
}
</script>
