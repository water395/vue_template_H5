import Vue from 'vue'
import App from './App.vue'

import '@/assets/css/index.css';
import '@/assets/css/flex.compatible.css';
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
