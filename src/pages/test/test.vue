<template>
  <div class="test">
    <Stack></Stack>
  </div>
</template>

<script>
  import Stack from '../../components/touch-swiper/index.vue';
  export default {
    name: 'test',
    components: {
      Stack
    }
  }
</script>

<style>
#app {
  margin-top: 60px;
  color: #2c3e50;
  text-align: center;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>