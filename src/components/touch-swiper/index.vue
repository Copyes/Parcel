<template>
  <ul class="stack">
    <li class="stack-item" v-for="(item, index) in pages" :key="index" :style="[transform(index)]">
      <div :style="{'backgroundColor': item.color}"></div>
    </li>
  </ul>
</template>
<script>
var getRandomColor = function(){
  return  '#' +
    (function(color){
    return (color +=  '0123456789abcdef'[Math.floor(Math.random()*16)])
      && (color.length == 6) ?  color : arguments.callee(color);
  })('');
}
export default {
  name: 'Stack',
  data() {
    return {
      pages: [
        {
          color: 'red'
        },
        {
          color: 'blue'
        },
        {
          color: 'green'
        },
        {
          color: 'yellow'
        },
        {
          color: 'pink'
        }
      ],
      firstCard: {
        currentPage: 0
      },
      tempData: {
        zIndex: 10,
        opacity: 1,
        visible: 3
      }
    }
  },
  methods: {
    transform(index) {
      if(index >= this.firstCard.currentPage) {
        let style = {};
        let visible = this.tempData.visible;
        let preIndex = index - this.firstCard.currentPage;
        // 可见数量内的卡片样式
        if(index <= this.firstCard.currentPage + this.tempData.visible - 1) {
          style['opacity'] = 1;
          style['transform'] = `translate3d(0,0,${-1 * preIndex * 60}px)`;
          style['zIndex'] = visible - index + this.firstCard.currentPage;
          style['transitionTimingFunction'] = 'ease'
          style['transitionDuration'] = 300 + 'ms';
        } else {
          style['zIndex'] = '-1';
          style['transform'] = `translate3d(0,0,${-1 * visible * 60}px)`;
        }
        return style;
      } 
    }
  }
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
  width: 200px;
  height: 200px;
  border-radius: 4px;
  background: #fff;
  text-align: center;
}
.stack-item div {
    display: block;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
</style>
