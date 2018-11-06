import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 0,
  title: 'NHL stats and stuff',
  hometeamid: '10',
  awayteamid: '1',
  matchupdate: '1',
  links: [
    'http://www.google.com',
    'http://www.yahoo.ca',
    'http://www.bing.com'
  ]
}

const getters = {
  countLinks: state => {
    return state.links.length
  }
}

const mutations = {
  ADD_LINK: (state, link) => {
    state.links.push(link)
  },
  REMOVE_LINK: (state, link) => {
    state.links.splice(link, 1)
  },
  REMOVE_ALL: (state) => {
    state.links = []
  },
  CHANGE_HOME_TEAM: (state, newhometeamid) => {
    state.hometeamid = newhometeamid
  },
  CHANGE_AWAY_TEAM: (state, newawayteamid) => {
    state.awayteamid = newawayteamid
  },
  CHANGE_MATCHUP: (state, newmatchupdate) => {
    state.matchupdate = newmatchupdate
  }
}

const actions = {
  removeLink: (context, link) => {
    context.commit("REMOVE_LINK", link)
  },
  removeAll({commit}){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('REMOVE_ALL')
        resolve()
      }, 1500)
    })
  },
  changeHomeTeam: (context, id) => {
    context.commit('CHANGE_HOME_TEAM', id)
  },
  changeAwayTeam: (context, id) => {
    context.commit('CHANGE_AWAY_TEAM', id)
  },
  changeMatchup: (context, id) => {
    context.commit('CHANGE_MATCHUP', id)
  }
  // changeHomeTeam({commit}){
  //   return new Promise((resolve, reject) => {
  //     commit('CHANGE_HOME_TEAM')
  //     resolve()
  //   })
  // },
  // changeAwayTeam({commit}){
  //   return new Promise((resolve, reject) => {
  //     commit('CHANGE_AWAY_TEAM')
  //     resolve()
  //   })
  // },
  // changeMatchup({commit}){
  //   return new Promise((resolve, reject) => {
  //     commit('CHANGE_MATCHUP_TEAM')
  //     resolve()
  //   })
  // }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
