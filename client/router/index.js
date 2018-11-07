import Vue from 'vue'
import VueRouter from 'vue-router'
import TeamselectPage from '../components/TeamselectPage'
import SchedulePage from '../components/SchedulePage'
import Matchup from '../components/Matchup'
import Vuikit from 'vuikit'

import '@vuikit/theme'

Vue.use(VueRouter) 
Vue.use(Vuikit)

const routes = [
  {
    path: '/', redirect: '/teamselect'
  },
  {
    path: '/teamselect',
    name: 'TeamselectPage',
    component: TeamselectPage,
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
    path: '/schedule',
    name: 'SchedulePage',
    component: SchedulePage,
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
    path: '/matchup',
    name:'Matchup',
    component: Matchup,
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
  }
]

export default new VueRouter({
  scrollBehavior(){
    return { x: 0, y: 0 };
  },mode: 'history', routes})