<template>
  <ul class="stack">
    <li class="stack-item" style="transform: translate3d(0, 0, 0); opacity: 1; z-index: 10;"></li>
    <li class="stack-item" style="transform: translate3d(0, 0, -60px); opacity: 1; z-index: 1;"></li>
    <li class="stack-item" style="transform: translate3d(0, 0, -120px); opacity: 1; z-index: 1;"></li>
    <li class="stack-item" style="transform: translate3d(0, 0, -180px); opacity: 0; z-index: -1;"></li>
    <li class="stack-item" style="transform: translate3d(0, 0, -180px); opacity: 0; z-index: -1;"></li>
  </ul>
</template>
<script>
export default {
  
}
</script>
<style scoped>
.stack {
  position: relative;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;

  perspective: 1000px;
  perspective-origin: 50% 150%;
  -webkit-perspective: 1000px;
  -webkit-perspective-origin: 50% 150%;
}
.stack-item {
  overflow: hidden;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background: red;
  text-align: center;
}
</style>
