import Vue from 'vue'
import App from './App.vue'

// 引入全局样式文件
import '@/style/index.less'
// 加入 vant 组件库
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
