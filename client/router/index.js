import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Vuikit from 'vuikit'

import '@vuikit/theme'

Vue.use(VueRouter) 
Vue.use(Vuikit)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      progress: {
        func: [
          {call: 'color', modifier: 'temp', argument: '#00b06c'},
          {call: 'fail', modifier: 'temp', argument: '#6e0000'},
          {call: 'location', modifier: 'temp', argument: 'top'},
          {call: 'transition', modifier: 'temp', argument: {speed: '1.5s', opacity: '0.6s', termination: 400}}
        ]
      }
    }
  },
  {
    path: '/work', redirect: '/'
  }
]

export default new VueRouter({
  scrollBehavior(){
    return { x: 0, y: 0 };
  },mode: 'history', routes})