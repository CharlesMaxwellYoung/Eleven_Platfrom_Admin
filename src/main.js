import Vue from 'vue'
import ElementUI from 'element-ui'
import { Message, loading } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import axios from 'axios'
import router from '~/app/app.router'
import Sto from 'store'
import Config from '~/app/config/index'
import * as moment from 'moment'
Vue.use(ElementUI)
Vue.prototype.$http = axios
Vue.prototype.$sto = Sto;
Vue.prototype.$loading = loading
Vue.prototype.$conf = Config
Vue.prototype.$moment = moment

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
