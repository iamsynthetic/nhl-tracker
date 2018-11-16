<template>
    <div class="teamselectpage">
      <v-container grid-list-lg id="scroll-target" class="vcontainer">
        <v-layout row wrap class="vlayout">
          <v-flex v-for="(item, index) in nhlteams.teams" :key="`card-${item.id}`" xs4 md2>
            <!-- <v-card flat tile> -->
            <div class="imagecontainer" @mouseenter="fillcolor" @mouseleave="emptycolor" @click="clickTextlink('/schedule', item.id, item.name)">
              <v-img :src="`../../static/logos/${item.id}.png`" contain aspect-ratio="1"></v-img>
              <v-card-text>
                  <h3 class="teamname text-xs-center">{{ item.name }}</h3>
              </v-card-text>
            </div>
            <!-- </v-card> -->
          </v-flex>
        </v-layout>
      </v-container>
    </div>
</template>

<script>

import axios from 'axios'
import itemCard from './itemCard'
import router from '../router'
import nhlService from '../services/nhlService'
import { mapState, mapMutations, mapActions } from 'vuex'
import { TweenMax } from 'gsap'

export default {
  name: 'TeamselectPage',
  components: {
    itemCard
  },
  data() {
    return {
      gameCount: 0,
      nhlteams: []
    };
  },
  created(){
    this.$eventHub.$on('filterdata', this.clickTextlink);
    this.getTeam();
    this.changethepagenumber(1);
  },
  mounted() {
    
  },
  computed: {
    theselectedteam: function(){
        return this.$store.state.teamselectedid
    }
  },
  methods: {
    ...mapMutations(['CHANGE_TEAM_SELECTED', 'CHANGE_TEAM_NAME', 'CHANGE_PAGENUMBER']),
    ...mapActions(['changeTeamSelected', 'changeTeamName', 'changePagenumber']),
    
    changetheteamselected(id){
      this.changeTeamSelected(id);
    },

    changetheteamname(id){
      this.changeTeamName(id);
    },

    changethepagenumber(id){
      this.changePagenumber(id);
    },

    async getTeam(id){
        console.log(typeof(id));
        if(isNaN(id)){
            console.log('getTeam() in TeamSelectPage this.theselectedteam is: ' + this.theselectedteam);
            const response = await nhlService.getAllTeams(this.theselectedteam)
            this.nhlteams = response.data
        }
        else {
            console.log('matchup property is a number')
            const response = await nhlService.getAllTeams(id)
            this.nhlteams = response.data
        }
    },

    gotoNextTeam(nextgame = false){
        if(nextgame == false){
            if(this.gameCount == 0){
                //do nothing
            }else{
                //go to previous game
                this.gameCount--;
            }
        }
        else if(nextgame == true)
        {
            if(this.gameCount == 81){
                //do nothing
            }else{
                //go to the next game
                this.gameCount++;
            }
        }
        this.getTeam(this.$store.state.teamselectedid[this.gameCount]);
    },

    fillcolor(e){
      console.log(e.target);
      // TweenMax.to(e.target, 1, {'-webkit-filter':'grayscale(0%)',filter: 'grayscale(0%)'});
       //TweenMax.to(e.target, 1, {'-webkit-filter':'grayscale(100%)',filter: 'grayscale(100%)'});
       TweenMax.to(e.target, .2, {css: {opacity: 1, 'filter': 'grayscale(0%)','-webkit-filter': 'grayscale(0%)'}, ease:Power4.easeIn})
      //TweenMax.to(e.target, .5, {x:'-20px', autoAlpha:0, ease:Expo.easeOut});
    },

    emptycolor(e){
      console.log('e is: ' + e.target);
      TweenMax.to(e.target, .2, {css: {opacity: .2, 'filter': 'grayscale(90%)','-webkit-filter': 'grayscale(90%)'}, ease:Power4.easeOut})
    },

    clickTextlink(url, teamid, teamname){
      this.changetheteamselected(teamid);
      this.changetheteamname(teamname);
      this.changethepagenumber(2);
      router.push(url);
    }
  }
};
</script>

<style lang="scss" scoped>

@import "../../node_modules/uikit3-extra-widths/uikit3/width-ex";
@import "../styles/styles.scss";

.imagecontainer{
  -webkit-filter:grayscale(90%);
  filter:grayscale(90%);
  opacity:.4;
}
.imagecontainer:hover{
  cursor:pointer;
}
.the-cards{
  margin-right:50px;
}

#parent {
  margin-top:20px;
  // width: 60vw;
  width:700px;
  height: 80vh;
  display: inline-block;
}

  #child {
    width: 700px;
    height: 100%;
  }

.teamname{
  color: $primary;
}
.search-wrapper{
  /* margin-left:75px; */
}
.form-check{
    /* width:150px; */
}

.form-check-label{
    font-size:14px;
}

.schedule-grid-rectangle{
  height:110px;
}

.schedulebox{
  width:97%;
  height:110px;
  background-color:$dark;
}

.label{
  color:$light;
  font-size:16px;
  font-family: 'Fjalla One', sans-serif;
}

// p, ul, ol, dl, pre, address, fieldset, figure
p
{
  margin-top:0px;
  margin-bottom:0px;
}
ul{
  //margin-left:20px;
  margin:0;
}

.hrline{
  color:$lightgrey;
  width:100%;
  height:1px;
}

.schedule-date{
  font-size:20px;
  font-weight:bold;
  font-family: 'Fjalla One', sans-serif;
  color:$white;
  text-transform: uppercase;
  text-align:left;
}

.schedule-time{
  font-size:16px;
  font-family: 'Fjalla One', sans-serif;
  color:$white;
  text-align:left;
}

.scheduleboxes{
    display: flex;
    align-items: center;
    justify-content: center;
}
.schedulebox1{
  background-color:$success;
}
.schedulebox2{
  
  background-color:$info;
}
.schedulebox3{
  
  background-color:$warning;
}
.schedulebox4{
  
  background-color:$error;
}
.schedulebox5{
  
  background-color:$accent;
}
.schedulebox6{
  
  background-color:$lightblue;
}

.scheduleboxitem{
  //height:175px;
  list-style:none;
  text-align:center;
  padding:0;
  //line-height:1px;
  //margin-top:10px;
  //background-color:$light;
}

.scheduleboxitem p{

  font-size:20px;
  font-weight:bold;
  font-family: 'Fjalla One', sans-serif;
  color:$white;
  //text-transform: uppercase;
  text-align:left;
}

.scheduleboxitem img{
  width:40px;
  height:40px;
  padding:0px 10px 5px 0px;
}

</style>