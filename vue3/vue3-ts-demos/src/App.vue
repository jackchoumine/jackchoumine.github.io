<template>
  <div id="app">
    <!-- <NotificationProvider> -->
    <div id="nav">
      <RouterLink to="/">Home</RouterLink> | <RouterLink to="/examples">Examples</RouterLink> |
      <RouterLink to="/form">Form Validation</RouterLink> |
      <RouterLink to="/posts">Paginated Posts</RouterLink> |
      <RouterLink to="/images">Infinite Images</RouterLink> |
      <RouterLink to="/upload">Upload Dropzone</RouterLink>
    </div>
    <RouterView />
    <!-- </NotificationProvider> -->
  </div>
</template>

<script lang="ts">
// import { NotificationProvider } from './store'
export default {
  name: 'App',
  components: {
    // NotificationProvider,
  },
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-bottom: 10px;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
