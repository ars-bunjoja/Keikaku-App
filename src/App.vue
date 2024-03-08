<template>
  <HeaderComponent style="display: none;" />
  <router-view/>
</template>

<style>
*, body, #app {
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
}
body {
  /* overflow: hidden; */
}
</style>

<script>
import HeaderComponent from './components/HeaderComponent.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent
  }
}
</script>