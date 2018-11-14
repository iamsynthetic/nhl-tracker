<template>
    <v-content class="schedulepage">
      <v-container class="vcontainer">
        <v-layout row wrap class="vlayout">
          <v-flex xs12>
            <ul class="breadcrumb">
              <li><a @click="clickTextLink('/teamselect')">teams</a></li>
              <li>schedule</li>
            </ul>
          </v-flex>
          <v-flex class="logocontainer" xs12 lg3>
            <img class="thelogo" :src="`../../static/logos/${theteamid}.png`" alt="">
          </v-flex>
          <v-flex class="textcontainer" xs12 lg3>
            <p class="thetitle">{{theteamname}}<br><span class="thesubtitle">2018 - 2019 schedule</span></p>
          </v-flex>

          <v-flex xs12 lg6>
            <v-card>
              <vue-scroll class="vscroll" :ops="ops">
              <div class="vscroll" id="child">
              <v-list three-line>
                <template class="thelistgroup" v-for="(item, index) in nhlschedule.dates">
                  <v-divider v-if="index < nhlschedule.dates.length" :key="`divider-${item.date}`"></v-divider>
                  <v-subheader v-if="item.date">
                    {{ item.date }}
                  </v-subheader>
                  <v-list-tile class="listtile-link" avatar @mouseover="listover" @mouseout="listout" @click="clickScheduledGame('/matchup', index, item.games[0].teams.away.team.id, item.games[0].teams.home.team.id, item.date, item.games[0].gamePk)">
                    <v-flex d-flex xs12>
                      <v-layout row wrap>
                        <v-flex d-flex xs12>
                          <v-flex d-flex xs2 sm1>
                            <v-list-tile-avatar size="35" tile class='mt-1'>
                                <img class="littleavatar" :src="`../../static/logos/${item.games[0].teams.away.team.id}.png`" alt="team logo">
                            </v-list-tile-avatar>
                          </v-flex>
                          <v-flex d-flex xs7>
                            <v-list-tile-content>
                              <v-list-tile-title class="awayteamname" e d-flex xs11 v-html="item.games[0].teams.away.team.name"></v-list-tile-title>
                            </v-list-tile-content>
                          </v-flex>
                          <v-flex d-flex xs4>
                            <v-list-tile-content class="pb-2 align-end justify-end">
                              <p class="gametimetxt" color="grey lighten-4">{{ item.games[0].gameDate | moment("MMM D") }}</p>
                            </v-list-tile-content>
                          </v-flex>
                        </v-flex>
                        <v-flex d-flex xs12>
                          <v-flex d-flex xs2 sm1>
                            <v-list-tile-avatar size="35" tile class='mt-1'>
                                <img class="littleavatar" :src="`../../static/logos/${item.games[0].teams.home.team.id}.png`" alt="team logo">
                            </v-list-tile-avatar>
                          </v-flex>
                          <v-flex d-flex xs7>
                            <v-list-tile-content class='pt-1'>
                              <v-list-tile-title class="hometeamname" d-flex xs11 v-html="item.games[0].teams.home.team.name"></v-list-tile-title>
                            </v-list-tile-content>
                          </v-flex>
                          <v-flex d-flex xs4>
                            <v-list-tile-content class="pb-1 align-end justify-end">
                              <p class="gametimetxt" v-if="item.games[0].status.detailedState==='Final'">
                                FINAL {{ item.games[0].teams.away.score }} - {{ item.games[0].teams.home.score }}
                              </p>
                              <p class="gametimetxt" v-else>
                                {{ item.games[0].gameDate | moment("h:mm a") }}
                              </p>
                            </v-list-tile-content>
                          </v-flex>
                        </v-flex>
                      </v-layout>
                    </v-flex> 
                  </v-list-tile>
                </template>
              </v-list>
              </div>
            </vue-scroll>
            </v-card>
          </v-flex>

        </v-layout>
      </v-container>
    </v-content>
</template>


<script>

import axios from 'axios'
import vueMoment from 'vue-moment'
import data from '../data/data'
import vuescroll from 'vuescroll'
import router from '../router'
import nhlService from '../services/nhlService'
import { mapState, mapMutations, mapActions } from 'vuex'

const easings = [
  'easeInQuad',
  'easeOutQuad',
  'easeInOutQuad',
  'easeInCubic',
  'easeOutCubic',
  'easeInOutCubic',
  'easeInQuart',
  'easeOutQuart',
  'easeInOutQuart',
  'easeInQuint',
  'easeOutQuint',
  'easeInOutQuint'
];
export default {
  name: 'SchedulePage',
  components: {
    // itemCard
  },
  data() {
    return {
      ops: {
          bar: {
            keepShow:true,
            background: "#80cbc4"
          }
      },
      filteredData: [],
      search: '',
      stacks: [
      {
        checked: false,
        value: 'language'
      },
      {
        checked: false,
        value: 'framework'
      },
      {
        checked: false,
        value: 'frontend'
        },
      {
        checked: false,
        value: 'backend'
      },
      {
        checked: false,
        value: 'mobile'
      },
      {
        checked: false,
        value: 'web'
      },
      {
        checked: false,
        value: 'hybrid'
      },
      {
        checked: false,
        value: 'database'
      },
      {
        checked: false,
        value: 'console'
      },
      {
        checked: false,
        value: 'online'
      }
      ],
      easings,
      teamid: "",
      nhldata: [],
      nhlschedule: [],
      nhlschedulegamepks: [],
      pastgame: true,
      dateNow: 'the date here'
    };
  },
  created(){
    this.$eventHub.$on('filterdata', this.clickTextlink);
    //this.getNHLData();
    this.getNHLSchedule();
  },
  mounted() {
    
  },
  computed: {
    selectedFilters: function() {
      let filters = [];
      let checkedFiters = this.stacks.filter(obj => obj.checked);
      checkedFiters.forEach(element => {
        filters.push(element.value);
      });
      return filters;
    },
    theteamid: function(){
      //return store.state.teamid
      //return this.$store.state.hometeamid
      return this.$store.state.teamselectedid
    },
    theteamname: function(){
      return this.$store.state.teamname
    }
  },
  methods: {
    ...mapMutations(['CHANGE_HOME_TEAM', 'CHANGE_AWAY_TEAM', 'CHANGE_GAME_NUMBER','CHANGE_MATCHUP', 'CHANGE_MATCHGAMEPK', 'ADD_GAMEPKS', 'EMPTY_GAMEPKS']),
    ...mapActions(['changeHomeTeam', 'changeAwayTeam', 'changeGamenumber','changeMatchup', 'changeMatchgamepk', 'fillGamePks', 'emptyGamePks']),
    
    changethehometeam(id){
      this.changeHomeTeam(id);
    },

    changetheawayteam(id){
      this.changeAwayTeam(id);
    },

    changethematchup(id){
      this.changeMatchup(id);
    },

    changethegamenumber(id){
      this.changeGamenumber(id);
    },

    changethematchgamepk(id){
      console.log('changethematchgamepk is: ' + id);
      this.changeMatchgamepk(id);
    },

    addthegamepks(id){
      console.log('addthegamepks is: ' + id);
      this.fillGamePks(id);
    },

    emptythegamepks(){
      console.log('emptygamepks');
      this.emptyGamePks()
    },

    async getNHLData(){
      console.log(this.theteamid);
      const response = await nhlService.getATeam(this.theteamid)
      this.nhldata = response.data
    },

    async getNHLSchedule(){
      const response = await nhlService.getTeamSchedule(this.theteamid)
      this.nhlschedule = response.data
      
      // for (var key in this.nhlschedule.dates) {
      //     console.log('key1 is: ' + key);
      // }

      //need to clear the gamePk here once, before we populate it.
      this.emptythegamepks();


      for (const value of this.nhlschedule.dates) {
        console.log('value amount is: ' + value);
        console.log('value is : ' + value.games[0].gamePk);
        this.addthegamepks(value.games[0].gamePk);
      }
    },

    getTime(thedate){
      console.log('dateNow is: ' + this.dateNow);
      console.log('thedate is: ' + thedate);
      this.dateNow = new Date().getFullYear()
      console.log('dateNow now is: ' + this.dateNow);
      console.log('thedate now is: ' + thedate);
      return this.dateNow;
    },

    pastgamefunc(awayscore, homescore, currstatus){
      if(currstatus == 'Final'){
        console.log('awayscore is : ' + awayscore)
        console.log('homescore is: ' + homescore)
      }
      else{
        console.log('game not done show date');
      }
    },
    listover(e){
      console.log('e.target is: ' + e.target);
      console.log('listover');
      //TweenMax.to(e.target, .5, {x:'-20px', autoAlpha:0, ease:Expo.easeOut});
      TweenMax.to(e.target, .1, {css: {textDecoration:'none'}});
      TweenMax.to(".gametimetxt", .1, {css: {textDecoration:'none', color:'#757575'}});
      TweenMax.to(".awayteamname", .1, {css: {textDecoration:'none', color:'#000000'}});
      TweenMax.to(".hometeamname", .1, {css: {textDecoration:'none', color:'#000000'}});
    },
    listout(e){
      console.log('listout');
      // TweenMax.to(e.target, .1, {css: {textDecoration:'none'}});
      // TweenMax.to(".gametimetxt", .1, {css: {textDecoration:'none', color:'#757575'}});
      // TweenMax.to(".awayteamname", .1, {css: {textDecoration:'none', color:'#000000'}});
      // TweenMax.to(".hometeamname", .1, {css: {textDecoration:'none', color:'#000000'}});
    },
    clickScheduledGame(url, gamenumber, awayteamid, hometeamid, matchupdate, matchgamepk){
     //console.log('teamid is: ' + this.teamid);
      //need to set the state here
      console.log('schedulepage url is: ' + url);
      console.log('gamenumber is: ' + gamenumber);
      console.log('schedulepage awayteamid is: ' + awayteamid);
      console.log('schedulepage hometeamid is: ' + hometeamid);
      console.log('schedulepage matchupdate is: ' + matchupdate);
      console.log('schedulepage matchgamepk is: ' + matchgamepk);

      console.log('TEAM ID IS: ' + this.theteamid);

      this.changethehometeam(hometeamid);
      this.changethegamenumber(gamenumber);
      this.changetheawayteam(awayteamid);
      this.changethematchup(matchupdate);
      this.changethematchgamepk(matchgamepk);
     router.push(url);
    },
    clickTextLink(url){
      router.push(url);
    },
    onScroll (e) {
      this.offsetTop = e.target.scrollTop
    }
  }
};
</script>

<style lang="scss" scoped>

@import "../../node_modules/uikit3-extra-widths/uikit3/width-ex";
@import "../styles/styles.scss";

// grey fcfcfc - grey lighten-4
// pink f7567c pink lighten-1
// yellow fffae3 - amber lighten-5
// blue 99e1d9 - teal lighten-3
// black 5d576b - blue-grey darken-4

.schedulepage{
  //display:flex;
  //justify-content:center;
  //align-items:center;
  //height: calc(100vh - 60px);
}

a {
  text-decoration:none;
}

.vcontainer{
  //max-height: 92vh;
  //max-width:70vw;
  padding:0;
  height: calc(100vh - 60px);
}

ul.breadcrumb {
    padding: 0px 0px;
    margin-top:30px;
    list-style: none;
}
ul.breadcrumb li {
    display: inline;
    font-size: 14px;
    color: $primary;
}
ul.breadcrumb li+li:before {
    padding-left: 9px;
    padding-right:9px;
    color: $grey;
    content: "\003e";
}
ul.breadcrumb li a {
    color: $success;
    text-decoration: none;
}
ul.breadcrumb li a:hover {
    
    text-decoration: underline;
}

#child{
  width:auto !important;
  height:60vh !important;
}
.vlayout{
  height: calc(100vh - 60px);
}
.logocontainer{
  display:flex;
  align-items:center;
  max-height:400px;
}
.textcontainer{
  max-height:400px;
  display:flex;
  align-items:center;
}
.thelogo{
  width:20vw;
  height:auto;
  margin:0 auto;
}
.thetitle{
  font-size:30px;
  color:$primary;
}
.thesubtitle{
  font-size:16px;
  color:$secondary;
}
.notlistcontent{
  position:fixed;
}
.v-list{
  padding:0 0 30px 0;
  background:$info;
}

.gametimetxt{
  color: #757575;
  text-decoration:none;
}

#child {
    width:100vw;
    height: 100vh;
    background-color:$lightgrey;
  }

.search-wrapper{
}
.form-check{
}

.form-check-label{
    font-size:14px;
}

.schedule-grid-rectangle{
  height:110px;
}

.schedulebox{
  border-bottom: 1px solid $grey;
  width:100%;
  background-color:$light;
}

.label{
  color:$light;
  font-size:16px;
  font-family: 'Nunito', sans-serif;
}

// p, ul, ol, dl, pre, address, fieldset, figure
p
{
  margin-top:0px;
  margin-bottom:0px;
}
ul{
  margin:0;
}

.hrline{
  color:$lightgrey;
}

.schedule-date{
  font-size:20px;
  font-weight:bold;
  font-family: 'Nunito', sans-serif;
  color:$dark;
  text-transform: uppercase;
  text-align:left;
}

.schedule-time{
  font-size:16px;
  font-family: 'Nunito', sans-serif;
  color:$dark;
  text-align:left;
}

.scheduleboxes{
    display: flex;
    align-items: center;
    justify-content: center;
}
.schedulebox1{
  background-color:$white;
}
.schedulebox2{
  
  background-color:$white;
}
.schedulebox3{
  
  background-color:$white;
}
.schedulebox4{
  
  background-color:$white;
}
.schedulebox5{
  
  background-color:$white;
}
.schedulebox6{
  
  background-color:$white;
}

.scheduleboxitem{
  list-style:none;
  text-align:center;
  padding:0;
}

.scheduleboxitem p{

  font-size:20px;
  font-weight:bold;
  font-family: 'Nunito', sans-serif;
  color:$dark;
  text-align:left;
}

.scheduleboxitem img{
  width:40px;
  height:40px;
  padding:0px 10px 5px 0px;
}

@media only screen and (min-width: 320px){
  .container{
    max-width: 300px;
  }


  .schedulepage{
    height: 100%;
  }
  .thetitle{
    font-size:30px;
    color:$primary;
    margin: 0 auto;
  }
  .thesubtitle{
    font-size:16px;
    color:$secondary;
    margin: 0 auto;
  }
  .textcontainer{
    max-height:400px;
    margin-bottom:40px;
    text-align:center;
  }
}

@media only screen and (min-width: 375px){
  .container{
    max-width:350px;
  }
}

@media only screen and (min-width: 480px){
  .container{
    max-width:450px;
  }
}

@media only screen and (min-width: 600px){
  .container{
    max-width:500px;
  }
}

@media only screen and (min-width: 768px){
  .container{
    max-width:700px;
  }
}

@media only screen and (min-width: 900px){
  .container{
    max-width:800px;
  }
}

@media only screen and (min-width: 1100px){
  .container{
    max-width:1000px;
  }
}

@media only screen and (min-width: 1264px){
  .container{
    max-width:1164px;
  }

  .thetitle{
    font-size:30px;
    color:$primary;
    margin: 0;
  }
  .thesubtitle{
    font-size:16px;
    color:$secondary;
    margin: 0;
  }
  .vcontainer{
    display:flex;
    justify-content:center;
    align-items:center;
    height: calc(100vh - 60px);
  }
  .textcontainer{
    max-height:400px;
    display:flex;
    align-items:center;
    text-align:left;
  }
}

@media only screen and (min-width: 1400px){
  .container {
      max-width: 1300px;
  }
}
/* Large screens ----------- */
@media only screen and (min-width: 1600px) {
/* Styles */
  .container{
    max-width: 1400px;
  }
}
/* Large screens ----------- */
@media only screen and (min-width: 1800px) {
/* Styles */
  .container{
    max-width: 1600px;
  }
}

/* Large screens ----------- */
@media only screen and (min-width: 1900px) {
/* Styles */
  .container{
    max-width: 1700px;
  }
}


</style>