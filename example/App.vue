<template>
  <div id="app">
    <rating v-model="rateMe" type="heart"></rating>
  </div>
</template>

<script>
import Rating from '../src/v-rating';

export default {
  components: {
    Rating,
  },
  data() {
    return {
      rateMe: 0,
    };
  },
};
</script>