import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './components/App'
import router from './router'
import store from './store'
import VueLoading from 'vue-component-loading'
import axios from 'axios'
import VuikitIcons from '@vuikit/icons'
import vueMoment from 'vue-moment'
import vuescroll from 'vuescroll'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css';

import 'vuescroll/dist/vuescroll.css'
import 'vuetify/dist/vuetify.min.css'

Vue.use(VuikitIcons)
Vue.use(Vuetify, {iconfont: 'mdi'}, {
  theme: {
    primary: '#f5f5f5',
    secondary: '#fff8e1',
    accent: '#ec407a',
    error: '#FF5252',
    info: '#263238',
    success: '#80cbc4',
    warning: '#FFC107'
  }})

Vue.use(vueMoment)
Vue.use(VueLoading, config)
Vue.use(axios)
Vue.use(vuescroll)

sync(store, router)


let config = {
  progressBar: {
    color: '#999999',
    failedColor: '#ff0000',
    thickness: '2px'
  }
}

//might be better to abstract this to another file later on if this gets too big
// axios.defaults.baseURL = 'https://statsapi.web.nhl.com/api/v1/'

Vue.prototype.$eventHub = new Vue();

Vue.config.productionTip = false

const app = new Vue({
  router,
  store,
  ...App
})

export { app, router, store }