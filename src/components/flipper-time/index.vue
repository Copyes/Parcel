<template>
  <div class="flipper-box">
    <FlipperNum ref="flipperHour1" />
    <FlipperNum ref="flipperHour2" />
    <em>:</em>
    <FlipperNum ref="flipperMinute1" />
    <FlipperNum ref="flipperMinute2" />
    <em>:</em>
    <FlipperNum ref="flipperSecond1" />
    <FlipperNum ref="flipperSecond2" />
  </div>
</template>
<script>
import FlipperNum from "./flipper-clock";
export default {
  name: 'FlipperBox',
  data() {
    return {
      timer: null,
      flipperObjs: []
    }
  },
  methods: {
    init() {
      let now = new Date();
      let nowTimeStr = this.formatDate(new Date(now.getTime()), 'hhiiss');
      for(let i = 0; i < this.flipperObjs.length; i++) {
        this.fipperObjs[i].setFront(nowTimeStr[i]);
      }
    },
    run() {
      this.timer = setInterval(() => {
        // 获取当前时间
        let now = new Date();
        let nowTimeStr = this.formatDate(new Date(now.getTime() - 1000), 'hhiiss');
        let nextTimeStr = this.formatDate(now, 'hhiiss')
        for(let i = 0; i < this.flipperObjs.length; i++) {
          if(nowTimeStr[i] === nextTimeStr[i]) {
            continue;
          }
          this.flipperObjs[i].flipBack(nowTimeStr[i], nextTimeStr[i]);
        }
      }, 1000);
    },
    formatDate(date, formatStr) {
      if(/(y+)/.test(formatStr)) {
        formatStr = formatStr.replace(
          RegExp.$1,
          (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        );
      }
      let obj = {
        'm+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'i+': date.getMinutes(),
        's+': date.getSeconds()
      }
      for(let k in obj) {
        if(new RegExp(`${k}`).test(formatStr)) {
          let str = obj[k];
          formatStr = formatStr.replace(
            RegExp.$1,
            RegExp.$1.length === 1 ? str : this.padLeftZero(str)
          )
        }
      }

      return formatStr;
    },
    // 时间补0
    padLeftZero(str) {
      return ('00' + str).substr(str.length)
    }
  },
  mounted() {
    this.flipperObjs = [
      this.$refs.flipperHour1,
      this.$refs.flipperHour2,
      this.$refs.flipperMinute1,
      this.$refs.flipperMinute2,
      this.$refs.flipperSecond1,
      this.$refs.flipperSecond2
    ];
    this.init();
    this.run();
  },
  components: {
    FlipperNum
  }
}
</script>
<style>
.flipper-box {
    text-align: center;
}
.flipper-box .M-Flipper {
    margin: 0 3px;
}
.flipper-box em {
    display: inline-block;
    line-height: 102px;
    font-size: 66px;
    font-style: normal;
    vertical-align: top;
}
</style>