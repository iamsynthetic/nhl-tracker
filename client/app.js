import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './components/App'
import router from './router'
import store from './store'
import VueLoading from 'vue-component-loading'
import axios from 'axios'
import VuikitIcons from '@vuikit/icons'
import vueMoment from 'vue-moment'

Vue.use(VuikitIcons)

Vue.use(vueMoment)
Vue.use(VueLoading, config)
Vue.use(axios)

sync(store, router)


let config = {
  progressBar: {
    color: '#999999',
    failedColor: '#ff0000',
    thickness: '2px'
  }
}

Vue.prototype.$eventHub = new Vue();

Vue.config.productionTip = false

const app = new Vue({
  router,
  store,
  ...App
})

export { app, router, store }