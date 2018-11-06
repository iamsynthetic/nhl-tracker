<template>
    <div class="schedulepage">
      <v-container id="scroll-target" class="vcontainer">
        <v-layout class="vlayout">
          <v-flex xs12>
            <v-card>
              <v-list three-line>
                <template v-for="(item, index) in nhlschedule.dates">
                  <v-divider v-if="index < nhlschedule.dates.length" :key="`divider-${item.date}`"></v-divider>
                  <v-subheader v-if="item.date">
                    {{ item.date }}
                  </v-subheader>
                  <v-list-tile class="listtile-link" avatar @click="clickTextlink('/matchup', item.games[0].teams.away.team.id, item.games[0].teams.home.team.id, item.date)">
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
                              <v-list-tile-title d-flex xs11 v-html="item.games[0].teams.away.team.name"></v-list-tile-title>
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
                              <v-list-tile-title d-flex xs11 v-html="item.games[0].teams.home.team.name"></v-list-tile-title>
                            </v-list-tile-content>
                          </v-flex>
                          <v-flex d-flex xs4>
                            <v-list-tile-content class="pb-1 align-end justify-end">
                              <p class="gametimetxt">{{ item.games[0].gameDate | moment("h:mm a") }}</p>
                            </v-list-tile-content>
                          </v-flex>
                        </v-flex>
                      </v-layout>
                    </v-flex> 
                  </v-list-tile>
                </template>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
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
      return this.$store.state.hometeamid
    }
  },
  methods: {
    ...mapMutations(['CHANGE_HOME_TEAM, CHANGE_AWAY_TEAM', 'CHANGE_MATCHUP']),
    ...mapActions(['changeHomeTeam', 'changeAwayTeam', 'changeMatchup']),
    
    changethehometeam(id){
      this.changeHomeTeam(id);
    },
    changetheawayteam(id){
      this.changeAwayTeam(id);
    },
    changethematchup(id){
      this.changeMatchup(id);
    },
    // getNHLData(){
    //   console.log('nhl')
    //   axios.get("teams/")
    //     .then((response) => {
    //       console.log('test');
    //       //this.loading = false;
    //       console.log('test 2');
    //       console.log('this.nhldata is: ' + this.nhldata)
    //       this.nhldata = response.data;
    //       console.log('test 3');
    //       console.log(this.nhldata);
    //     }, (error) => {
    //       //this.loading = false;
    //     })
    // },

    // getNHLSchedule(id){
    //   this.teamid = id;
    //   axios.get("schedule?teamId=" + id + "&startDate=2018-10-03&endDate=2019-04-06")
    //     .then((response) => {
    //       //this.loading = false;
    //       console.log('this.nhlschedule is: ' + this.nhlschedule)
    //       this.nhlschedule = response.data;
    //     }, (error) => {
    //       //this.loading = false;
    //     })
    // },

    async getNHLData(){
      console.log(this.theteamid);
      const response = await nhlService.getATeam(this.theteamid)
      this.nhldata = response.data
    },

    async getNHLSchedule(){
      console.log(this.theteamid);
      const response = await nhlService.getTeamSchedule(this.theteamid)
      this.nhlschedule = response.data
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
    clickTextlink(url, awayteamid, hometeamid, matchupdate){
     //console.log('teamid is: ' + this.teamid);
      //need to set the state here
      console.log('schedulepage url is: ' + url);
      console.log('schedulepage awayteamid is: ' + awayteamid);
      console.log('schedulepage hometeamid is: ' + hometeamid);
      console.log('schedulepage matchupdate is: ' + matchupdate);

      this.changethehometeam(hometeamid);
      this.changetheawayteam(awayteamid);
      this.changethematchup(matchupdate);
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
  display:flex;
  justify-content:center;
  align-items:center;
  height:calc(100vh - 65px);
}

.vcontainer{
  max-height: 92vh;
  max-width:70vw;
  padding:0;
}

.vlayout{
  height: auto;
}

.gametimetxt{
  color: #757575;
  text-decoration:none;
}

.the-cards{
}

#parent {
  width:100vw;
  height:93vh;
  display: inline-block;
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

</style>