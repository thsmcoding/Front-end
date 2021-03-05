<template>
  <div id="app" class="small-container-app">

  <div id="logo">
    <h3>Welcome to BSS App</h3>
    <h4>The best bike sharing system </h4>
    <img src="../src/assets/logo-bike.png">
  </div>
  <Station />
  </div>
</template>


<script>
import Station from '../src/components/Station.vue'

export default {
  name: 'App',
  components: {
    Station,
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 15px;
}
img {
  width: 10%;
}

h1, h2{
  font-weight: normal;
}
h4{
  margin-top:0%;
}

a {
  color: #42b983;
}
</style>
