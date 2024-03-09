<template>
  <div id="app">
    <HelloMapbox />
  </div>
</template>

<script>
import HelloMapbox from './components/HelloMapbox.vue'

export default {
  name: 'App',
  components: {
    HelloMapbox
  }
}
</script>

<style>
#app {
  height: 100vh;
  width: 100%;
}

body {
  margin: 0;
  padding: 0;
}

.mapboxgl-control-container {
  /* display: none; */
}
</style>
