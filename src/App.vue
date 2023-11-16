<template>
  <div id="app">
    <template v-if="isMobile">
      <ShortAddress/>
    </template>
    <template v-else>
      <DeskTopTips/>
    </template>
  </div>
</template>

<script>
import ShortAddress from './components/short-address.vue'
import DeskTopTips from './components/desktop-tips.vue'

export default {
  name: 'App',
  components: {
    ShortAddress,
    DeskTopTips
  },
  data() {
    return {
      isMobile: false,
    }
  },
  mounted () {
    document.title = '跳转小程序'
    // 判断是否移动设备
    this.isMobile = !!navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|IEMobile)/i);
    console.log('navigator.userAgent', navigator.userAgent);
    console.log('是否移动设备', this.isMobile);
  }
}
</script>

<style>
#app {
  font-family: PingFang-SC, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
