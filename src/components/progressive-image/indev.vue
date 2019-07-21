<template>
  <div ref="image" :class="['progressive-image', customClass]" :style="componentStyle">
    <div 
      v-if="cached"
      class="progressive-image-wrapper"
      :style="wrapperStyle"
      >
        <img 
          :class="['progressive-image-content', imageCustomClass]"
          :src="image" :alt="alt" />
    </div>
    <div v-else>
      <canvas></canvas>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>

<style scoped>

</style>
