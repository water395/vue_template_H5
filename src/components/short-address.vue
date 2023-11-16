<template>
  <div class="shortAddress">
    <div class="box flex-column-center-center">
      <img class="box_logo" :src="appIdInfo.headImg" />
      <span class="box_text">正在打开{{ appIdInfo.nickName || 鲜范小程序 }}...</span>
      <button class="open_btn" @click="initData">{{btnText}}</button>
    </div>
    <!-- <img class="footer_logo" :src="imgBaseUrl + 'footerbg.png'" /> -->
  </div>
</template>

<script>
import Axios from '@/request';
export default {
  name: 'ShortAddress',
  data() {
    return {
      btnText: '打开小程序',
      imgBaseUrl:'https://freshfans001.oss-cn-shenzhen.aliyuncs.com/static/img/',
      urlScheme: '', // 要跳转的链接 weixin://dl/business/?t=123
      appIdInfo:{},
    }
  },
  mounted () {
    var ua = navigator.userAgent.toLowerCase()
    var isWXWork = ua.match(/wxwork/i) == 'wxwork'
    var isWeixin = !isWXWork && ua.match(/micromessenger/i) == 'micromessenger'
    this.btnText = isWeixin ? '打开小程序' : '前往微信打开'
    console.log('isWeixin', isWeixin, this.btnText)
  },
  created () {
    this.initData()
  },
  methods: {
    async initData() {
      var m = location.href.match(/freshfans\.cn\/(\w+)/)
      console.log('路径参数',m,location.href)
      let {url} = this.getQueryObject() || {};
      console.log('url:', url);
      if (url) {
        let data = {
          'shortAddress': url,
        }
        //  短地址 - 获取businessId - POST
        var appIdInfo = await Axios.post('/usc/getSchemeCode/v2', data)
        if (appIdInfo && appIdInfo.code == 200 && appIdInfo.data) {
          this.appIdInfo = appIdInfo.data;
        }

        var res = await Axios.post('/usc/getSchemeCode', data)
        if (res && res.code == 200 && res.data) {
          this.urlScheme = `weixin://dl/business/?t=${res.data}`
        }
      }
      console.log('跳转的路径',this.urlScheme)
      if (this.urlScheme) {
        location.href = this.urlScheme;
      }
    },
    getQueryObject() {
      let url = window.location.href
      const search = url.substring(url.lastIndexOf('?') + 1)
      const obj = {}
      const reg = /([^?&=]+)=([^?&=]*)/g
      search.replace(reg, (rs, $1, $2) => {
        const name = decodeURIComponent($1)
        let val = decodeURIComponent($2)
        val = String(val) 
        obj[name] = val
        return rs
      })
      return obj
    }
  }
}
</script>

<style scoped>

.box{
  padding-top: 20vh;
}
.box_logo{
  border-radius: 50%;
  width: 21vw;
  height: 21vw;
}
.box_text{
  font-size: 4vw;
  margin: 3vw auto;
}
.open_btn{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #DCDFE6;
    color: #fff;
    background-color: #B69674;
    border-color: #B69674;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 400;
    user-select: none;
    padding: 12px 30px;
    font-size: 14px;
    border-radius: 4px;
    text-transform: none;
    
    overflow: visible;
  -webkit-appearance: button;
}
.footer_logo{
  position: fixed;
  bottom: 8vh;
  left: 50%;
  width: 80vw;
  transform: translateX(-50%);
}
</style>
