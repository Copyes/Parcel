<template>
  <div class="num-box">
    <div class="num front-num"></div>
    <div class="num back-num"></div>
  </div>
</template>
<script>
export default {
  name: "flipper-clock",
  data() {
    return {
      isFlipping: false,
      flipType: 'down',
      frontTextNum: 0,
      backTextNum: 1
    }
  },
  props: {
    frontText: {
      type: [Number, String],
      default: 0
    },
    backText: {
      type: [Number, String],
      default: 1
    },
    duration: {
      type: Number,
      default: 600
    }
  },
  created() {
    this.frontTextNum = this.frontText;
    this.backTextNum = this.backText;
  },
  methods: {
    _textClass(number) {
      return 'number' + number
    },
    _flip(type, front, back) {
      if(this.isFlipping) {
        return false;
      }
      this.flipType = type;
      this.frontTextNum = front;
      this.backTextNum = back;
      this.isFlipping = true;
      setTimeout(() => {
        this.isFlipping = false;
        this.frontTextNum = back;
      }, this.duration);
    },
    flipUp(front, back) {
      this._flip('up', front, back);
    },
    flipBack(front, back) {
      this._flip('down', front, back);
    },
    setFront(front) {
      this.frontTextNum = front;
    },
    setDown(back) {
      this.backTextNum = back;
    }
  }
}
</script>

<style>
.num-box {
  display: inline-block;
  position: relative;
  width: 60px;
  height: 100px;
  line-height: 100px;
  border: solid 1px #000;
  border-radius: 10px;
  background: #fff;
  font-size: 66px;
  color: #fff;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  text-align: center;
}
.num-box .num:before,
.num-box .num:after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  background-color: #000;
  overflow: hidden;
  box-sizing: border-box;
}
.num-box .num:before {
  top: 0;
  bottom: 50%;
  border-radius: 10px 10px 0 0;
  border-bottom: solid 1px #666;
}
.num-box .num:after {
  top: 50%;
  bottom: 0;
  border-radius: 0 0 10px 10px;
  line-height: 0;
}
</style>


