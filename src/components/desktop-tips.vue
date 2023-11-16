<template>
  <div class="tips">
    <h1>请在手机打开网页链接</h1>
  </div>
</template>

<script>
export default {
  name: 'desktopTips',
  data() {
    return {
      
    }
  },
  mounted () {
  },
  methods: {
    
  }
}
</script>

<style scoped>
.tips{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.tips h1{
    margin: 0;
    font-size: 3vh;
}
</style>
