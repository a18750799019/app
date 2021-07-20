import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import isdev from '@/util/ds.is-dev'
import { loadInitConf } from '@/util/ds.common'
import '@/util/ds.vant.import.js'
import moment from 'moment'

// import Vconsole from 'vconsole'
// const vConsole = new Vconsole()
// Vue.use(vConsole)

Vue.prototype.$moment = moment
Vue.config.productionTip = false
window.Vue = Vue

Promise.all([
  loadInitConf('init'),
  loadInitConf('api'),
  loadInitConf('areacode')
]).then(value => {
  Vue.prototype.$config = value[0]
  Vue.prototype.$areacode = value[2]
  const status = isdev ? 'debug' : 'release'
  let apiData = value[1]
  Object.keys(apiData).forEach(item => {
    apiData[item] = apiData[item][status]
      ? apiData[item][status]
      : apiData[item]
  })
  Vue.prototype.$api = apiData
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
