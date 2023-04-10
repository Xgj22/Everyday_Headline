import Vue from 'vue'
import App from './App.vue'

import router from '@/router/index'
import store from '@/store'
// 引入全局样式文件
import '@/style/index.less'
// 加入 vant 组件库
import Vant from 'vant'
import 'vant/lib/index.css'

// 加载动态设置 rem 基准值
import 'amfe-flexible'

// 加载 dayjs 初始化配置
import './utils/dayjs'
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
