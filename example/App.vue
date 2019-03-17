<template>
  <div id="app">
    <div class="ui rating"></div>
    <!-- <rating v-model="rateMe" type="heart"></rating> -->
  </div>
</template>

<script>
import Rating from "./Rating.vue";

export default {
  name: "App",
  components: {
    Rating
  },
  data() {
    return {
      rateMe: 0
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
