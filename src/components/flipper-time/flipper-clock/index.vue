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

