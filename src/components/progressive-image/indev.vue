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
      <canvas
        v-if="!isShowImage"
        width="1"
        height="1"
        class="progressive-image-canvas"
        ref="canvas"
      >
      </canvas>
      <div class="progressive-image-wrapper" :style="wrapperStyle">
        <transition
        enter-class="progressive-image-enter"
        enter-active-class="progressive-image-before-enter">
          <img 
          v-show="isShowImage"
          :class="['progressive-image-content', imageCustomClass]"
          ref="content"
          :src="image" :alt="alt">
        </transition>
        <transition
          enter-class="progressive-image-enter"
          enter-active-class="progressive-image-before-enter">
          <div
            v-if="isShowPlaceholder"
            class="progressive-image-placeholder"
            :class="{ 'progressive-image-placeholder-out': isShowImage }"
            :style="placeholderStyle">
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>

<style scoped>

</style>
