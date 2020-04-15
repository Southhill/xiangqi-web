import Vue from 'vue'
import App from './App.vue'

import './styles/index.less'

Vue.config.productionTip = false

// 添加简单的事件系统
Vue.prototype.$bus = new Vue()

new Vue({
  render: (h) => h(App),
}).$mount('#app')
