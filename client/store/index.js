import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 0,
  title: 'NHL stats and stuff',
  teamselectedid: 0,
  hometeamid: '10',
  awayteamid: '1',
  gamenumber: 0,
  matchupdate: '1',
  matchgamepk: '000000000',
  gamepks: [],
  links: [
    'http://www.google.com',
    'http://www.yahoo.ca',
    'http://www.bing.com'
  ]
}

const getters = {
  countLinks: state => {
    return state.links.length
  },
  checkhometeamid: state => {
    return state.hometeamid
  },
  checkawayteamid: state => {
    return state.awayteamid
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
  CHANGE_TEAM_SELECTED: (stat, newteamselectedid) => {
    state.teamselectedid = newteamselectedid
  },
  CHANGE_HOME_TEAM: (state, newhometeamid) => {
    state.hometeamid = newhometeamid
  },
  CHANGE_AWAY_TEAM: (state, newawayteamid) => {
    state.awayteamid = newawayteamid
  },
  CHANGE_MATCHUP: (state, newmatchupdate) => {
    state.matchupdate = newmatchupdate
  },
  CHANGE_GAME_NUMBER: (state, newgamenumber) => {
    state.gamenumber = newgamenumber
  },
  CHANGE_MATCHGAMEPK: (state, newmatchgamepk) => {
    console.log('change_matchgamepk mutation newmatchgamepk is: ' + newmatchgamepk);
    state.matchgamepk = newmatchgamepk
  },
  ADD_GAMEPKS: (state, newgamepks) => {
    console.log('add_gamepks mutation newgamepks is: ' + newgamepks);
    state.gamepks.push(newgamepks)
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
  changeTeamSelected: (context, id) => {
    context.commit('CHANGE_TEAM_SELECTED')
  },
  changeHomeTeam: (context, id) => {
    context.commit('CHANGE_HOME_TEAM', id)
  },
  changeAwayTeam: (context, id) => {
    context.commit('CHANGE_AWAY_TEAM', id)
  },
  changeMatchup: (context, id) => {
    context.commit('CHANGE_MATCHUP', id)
  },
  changeGamenumber: (context, id) => {
    context.commit('CHANGE_GAME_NUMBER', id)
  },
  changeMatchgamepk: (context, id) => {
    console.log('in store changematchgamepk action id is: ' + id);
    context.commit('CHANGE_MATCHGAMEPK', id)
  },
  fillGamePks: (context, id) => {
    console.log('in store fillGamePks action id is: ' + id);
    context.commit('ADD_GAMEPKS', id)
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
