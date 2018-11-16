import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 0,
  teamselectedid: "0",
  selectedfranchiseid: "0",
  teamname: '',
  hometeamid: '10',
  awayteamid: '1',
  gamenumber: 0,
  matchupdate: '1',
  matchgamepk: '000000000',
  pagenumber: "1",
  gamepks: []
}

const getters = {
  checkhometeamid: state => {
    return state.hometeamid
  },
  checkawayteamid: state => {
    return state.awayteamid
  },
  checkpagenumber: state => {
    return state.pagenumber
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
  CHANGE_TEAM_SELECTED: (state, newteamselectedid) => {
    state.teamselectedid = newteamselectedid
  },
  CHANGE_TEAM_NAME: (state, newteamnameid) => {
    state.teamname = newteamnameid
  },
  CHANGE_SELECTED_FRANCHISE: (state, newselectedfranchiseid) => {
    state.selectedfranchiseid = newselectedfranchiseid
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
  },
  EMPTY_GAMEPKS: (state) => {
    console.log('empty_gamepks mutation nogamepks');
    state.gamepks = []
  },
  CHANGE_PAGENUMBER: (state, newpagenumber) => {
    state.pagenumber = newpagenumber
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
    context.commit('CHANGE_TEAM_SELECTED', id)
  },
  changeTeamName: (context, id) => {
    context.commit('CHANGE_TEAM_NAME', id)
  },
  changeSelectedFranchise: (context, id) => {
    context.commit('CHANGE_SELECTED_FRANCHISE', id)
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
  },
  emptyGamePks: (context) => {
    console.log('in store emptyGamePks action');
    context.commit('EMPTY_GAMEPKS')
  },
  changePagenumber: (context, id) => {
    console.log('changePagenumber id is: ' + id);
    context.commit('CHANGE_PAGENUMBER', id)
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
