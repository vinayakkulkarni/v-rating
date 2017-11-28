<template>
  <div id="app">
    <Rating v-model="rateMe" type="heart"></Rating>
  </div>
</template>

<script>
import Rating from '../src/v-rating';

export default {
  components: {
    Rating
  },
  data() {
  	return {
  		rateMe: 0
  	}
  }
}
</script>