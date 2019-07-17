<template>
  <div class="stack-wrapper">
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

.stack-wrapper{
    position: relative;
    z-index: 1000;
    overflow: hidden;
    margin: 0 auto;
    padding: 0;
    width: 320px;
    height: 400px;
    list-style: none;
    pointer-events: none;
  }
</style>