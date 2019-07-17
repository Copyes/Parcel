<template>
  <ul class="stack">
    <li class="stack-item" v-for="(item, index) in pages" :key="index" :style="[transformIndex(index), transform(index)]"
      @touchstart.stop.capture="touchStart"
      @touchmove.stop.capture="touchMove"
      @touchend.stop.capture="touchEnd"
      @mousedown.stop.capture="touchStart"
      @mouseup.stop.capture="touchEnd"
      @mousemove.stop.capture="touchMove"
      @webkit-transition-end="onTransitionEnd"
      @transitionend="onTransitionEnd">
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
        start: {},
        end: {},
        currentPage: 0
      },
      tempData: {
        posWidth: '',
        posHeight: '',
        lastPosWidth: '', // 记录上次的位置，以便回弹
        lastPosHeight: '',
        tracking: false, // 是否在滑动，防止多次操作，影响体验
        animation: false, // 首图是否启用动画效果，默认为否
        opacity: 1, // 记录首图透明度
        swipe: false // onTransition判定条件
      }
    }
  },
  methods: {
    
    touchStart(e) {
      if(this.tempData.tracking) return;
      if(e.type === 'touchstart') {
        // 
        if(e.targetTouches.length > 1){
          this.tempData.tracking = false;
          return;
        } else {
          this.firstCard.start.t = new Date().getTime();
          this.firstCard.start.x = e.targetTouches[0].clientX;
          this.firstCard.start.y = e.targetTouches[0].clientY;
          this.firstCard.end.x = e.targetTouches[0].clientX;
          this.firstCard.end.y = e.targetTouches[0].clientY;
        }
      } else {
        this.firstCard.start.t = new Date().getTime();
        this.firstCard.start.x = e.clientX;
        this.firstCard.start.y = e.clientY;
        this.firstCard.end.x = e.clientX;
        this.firstCard.end.y = e.clientY;
      }
      this.tempData.tracking = true;
      this.tempData.animation = false;
    },
    touchMove(e) {
      // 记录滑动位置
      if(this.tempData.tracking && !this.tempData.animation){
        if(e.type === 'touchmove'){
          this.firstCard.end.x = e.targetTouches[0].clientX;
          this.firstCard.end.y = e.targetTouches[0].clientY;
        } else {
          this.firstCard.end.x = e.clientX;
          this.firstCard.end.y = e.clientY;
        }
        this.tempData.posWidth = this.firstCard.end.x - this.firstCard.start.x;
        this.tempData.posHeight = this.firstCard.end.y - this.firstCard.start.y;
      }
    },
    touchEnd(e) {
      this.tempData.tracking = false;
      this.tempData.animation = true
      if(Math.abs(this.tempData.posWidth) >= 100) {
        // 大于100就移除
        const radio = Math.abs(this.tempData.posWidth / this.tempData.posHeight);
        this.tempData.posWidth = this.tempData.posWidth > 0 ? this.tempData.posWidth + 200 : this.tempData.posWidth - 200;
        this.tempData.posHeight = this.tempData.posHeight > 0 ? Math.abs(this.tempData.posWidth * radio) : -Math.abs(this.tempData.posWidth * radio);
        this.tempData.opacity = 0;
        this.tempData.swipe = true;
        // 记录上次滑动的距离
        this.tempData.lastPosWidth = this.tempData.posWidth;
        this.tempData.lastPosHeight = this.tempData.posHeight;
        // 当前页的顺序加一
        this.firstCard.currentPage += 1;
        this.$nextTick(() => {
          this.tempData.posWidth = 0;
          this.tempData.posHeight = 0;
          this.tempData.opacity = 1;
        })
      } else {
        this.tempData.posWidth = 0;
        this.tempData.posHeight = 0;
        this.tempData.swipe = false;
      }
    },
    onTransitionEnd(index) {
      if(this.tempData.swipe && index === this.firstCard.currentPage - 1){
        this.tempData.animation = true;
        this.tempData.swipe = false;
        this.tempData.lastPosWidth = 0;
        this.tempData.lastPosHeight = 0;
      }
    },
    transform(index) {
      let style ={};
      if(index > this.firstCard.currentPage) {
        let visible = 3;
        let preIndex = index - this.firstCard.currentPage;
        // 可见数量内的卡片样式
        if(index <= this.firstCard.currentPage + visible - 1) {
          style['opacity'] = 1;
          style['transform'] = `translate3D(0,0,${-1 * preIndex * 60}px)`;
          style['zIndex'] = visible - index + this.firstCard.currentPage;
          style['transitionTimingFunction'] = 'ease'
          style['transitionDuration'] = 300 + 'ms';
        } else {
          style['zIndex'] = '-1';
          style['transform'] = `translate3d(0,0,${-1 * visible * 60}px)`;
        }
        return style;
      } else if(index === this.firstCard.currentPage - 1) {
        // 继续执行动画
        style['transform'] = 'translate3D(' + this.tempData.lastPosWidth + 'px' + ',' + this.tempData.lastPosHeight + 'px' + ',0px)'
        style['opacity'] = '0'
        style['zIndex'] = '-1'
        style['transitionTimingFunction'] = 'ease'
        style['transitionDuration'] = 300 + 'ms'
        return style;
      }
    },
    transformIndex(index) {
      if(index === this.firstCard.currentPage) {
        let style = {};
        style['transform'] = `translate3d(${this.tempData.posWidth}px,${this.tempData.posHeight}px,0)`;
        style['opacity'] = this.tempData.opacity;
        style['zIndex'] = 10;
        if (this.tempData.animation) {
          style['transitionTimingFunction'] = 'ease';
          style['transitionDuration'] = 300 + 'ms';
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
  height: 320px;

  perspective: 1000px;
  perspective-origin: 50% 150%;
  -webkit-perspective: 1000px;
  -webkit-perspective-origin: 50% 150%;
}
.stack-item {
  position: absolute;
  display: -webkit-flex;
  display: flex;
  overflow: hidden;
  -webkit-flex-direction: column;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  text-align: center;
  opacity: 0;
  pointer-events: auto;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.stack-item div {
    display: block;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
</style>
