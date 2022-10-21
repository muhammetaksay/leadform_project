import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import JsonViewer from 'vue-json-viewer'

Vue.use(JsonViewer)

Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  render: h => h(App),
}).$mount('#app')
