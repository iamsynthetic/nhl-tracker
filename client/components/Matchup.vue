<template>
    <v-content class="matchuppage">
        <v-container>
            <v-layout class="vlayout" row wrap>
                <v-flex xs12 my-auto text-xs-center>
                    <p class="team-title">Tonight's matchup</p>
                </v-flex>
                <v-flex xs12>
                    <v-layout class="matchup-background" v-if="matchboxscore.teams" row wrap>
                        <v-flex xs12 my-auto md4 text-xs-center>
                            <a><img class="logo" :src="`../../static/logos/${matchboxscore.teams.away.team.id}.png`" alt="" @click="gotoFranchise(`/franchise/${matchboxscore.teams.away.team.id}`, matchboxscore.teams.away.team.id)"></a>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <p>{{ matchboxscore.teams.away.team.name }}</p>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 md4 mt-auto mb-auto text-xs-center>
                            <v-layout>
                                <v-flex xs3 text-xs-center>
                                    <p class="statresult">{{ awayteamstats.goals }}</p>
                                    <p class="statresult">{{ awayteamstats.shots }}</p>
                                    <p class="statresult">{{ awayteamstats.powerPlayGoals }}/{{ awayteamstats.powerPlayOpportunities }}</p>
                                    <p class="statresult">{{ awayteamstats.powerPlayPercentage }}</p>
                                    <p class="statresult">{{ awayteamstats.powerPlayPercentage }}</p>
                                    <p class="statresult">{{ awayteamstats.faceOffWinPercentage }}</p>
                                    <p class="statresult">{{ awayteamstats.blocked }}</p>
                                    <p class="statresult">{{ awayteamstats.takeaways }}</p>
                                    <p class="statresult">{{ awayteamstats.giveaways }}</p>
                                    <p class="statresult">{{ awayteamstats.hits }}</p>
                                </v-flex>
                                <v-flex xs6 text-xs-center>
                                    <p class="statresult">GOALS</p>
                                    <p class="statresult">SHOTS</p>
                                    <p class="statresult">PIM</p>
                                    <p class="statresult">PP</p>
                                    <p class="statresult">PP % </p>
                                    <p class="statresult">FO %</p>
                                    <p class="statresult">BLOCKS</p>
                                    <p class="statresult">TAKEAWAYS</p>
                                    <p class="statresult">GIVEAWAYS</p>
                                    <p class="statresult">HITS</p> 
                                </v-flex>
                                <v-flex xs3 text-xs-center>
                                    <p class="statresult">{{ hometeamstats.goals }}</p>
                                    <p class="statresult">{{ hometeamstats.shots }}</p>
                                    <p class="statresult">{{ hometeamstats.powerPlayGoals }}/{{ hometeamstats.powerPlayOpportunities }}</p>
                                    <p class="statresult">{{ hometeamstats.powerPlayPercentage }}</p>
                                    <p class="statresult">{{ hometeamstats.powerPlayPercentage }}</p>
                                    <p class="statresult">{{ hometeamstats.faceOffWinPercentage }}</p>
                                    <p class="statresult">{{ hometeamstats.blocked }}</p>
                                    <p class="statresult">{{ hometeamstats.takeaways }}</p>
                                    <p class="statresult">{{ hometeamstats.giveaways }}</p>
                                    <p class="statresult">{{ hometeamstats.hits }}</p>
                                </v-flex>
                            </v-layout>
                            <v-layout class="nextprev-button-layout"> 
                                <v-flex xs4>
                                    <v-btn depressed small color="#FFC107" @click="gotoNextMatchup(false)">last game</v-btn>
                                </v-flex>
                                <v-flex class="my-auto" xs4>
                                    <p class="my-auto">{{ thegamenumber }} / 82</p>
                                </v-flex>
                                <v-flex xs4>
                                    <v-btn depressed small color="#FFC107" @click="gotoNextMatchup(true)">next game</v-btn>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 my-auto md4 text-xs-center>
                            <a><img class="logo" :src="`../../static/logos/${matchboxscore.teams.home.team.id}.png`" alt="" @click="gotoFranchise(`/franchise/${matchboxscore.teams.home.team.id}`, matchboxscore.teams.home.team.id)"></a>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <p>{{ matchboxscore.teams.home.team.name }}</p>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
import axios from 'axios'
import router from '../router'
import nhlService from '../services/nhlService'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
    name: 'Matchup',
    data(){
        return{
            matchboxscore: [],
            hometeamstats: [],
            awayteamstats: [],
            theteamselected: '',
            items: [
                {
                    text: 'teams',
                    disabled: false,
                    href: '/'
                },
                {
                    text: 'schedule',
                    disabled: false,
                    href: '/schedule'
                },
                {
                    text: 'matchup',
                    disabled: true,
                    href: ''
                }
            ],
            gameCount: 0

        }
    },
    mounted(){

    },
    created(){
        this.getMatchup();
        this.setGameCount();
        this.getTheTeam();
    },
    beforeDestroy(){

    },
    computed: {
        
        thehometeamid: function(){
            return this.$store.state.hometeamid
        },
        theawayteamid: function(){
            return this.$store.state.awayteamid
        },
        thematchupdate: function(){
            return this.$store.state.matchupdate
        },
        thematchgamepk: function(){
            return this.$store.state.matchgamepk
        },
        theselectedteam: function(){
            return this.$store.state.teamselectedid
        },
        thegamenumber: function(){
            return this.gameCount + 1
        }
    },
    methods: {
        ...mapMutations(['CHANGE_PAGENUMBER', 'CHANGE_TEAM_SELECTED', 'CHANGE_SELECTED_FRANCHISE']),
        ...mapActions(['changePagenumber', 'changeTeamSelected', 'changeSelectedFranchise']),

        changetheteamselected(id){
            this.changeTeamSelected(id);
        },
        showselectedfranchise(id){
         this.changeSelectedFranchise(id)
        },
        setGameCount(){
            this.gameCount = this.$store.state.gamenumber;
        },
        changethepagenumber(id){
            this.changePagenumber(id);
        },
        async getTheTeam(){
            const response = await nhlService.getATeam(this.theselectedteam);
            this.theteamselected = response.data.teams[0].name
        },
        async getMatchup(matchup){
            console.log(typeof(matchup));
            if(isNaN(matchup)){
                console.log('getmatchup in matchup.vue this.thematchgamepk is: ' + this.thematchgamepk);
                console.log('getmatchup in matchup.vue matchup is: ' + matchup);
                const response = await nhlService.getMatchupBoxScore(this.thematchgamepk)
                this.matchboxscore = response.data
                this.hometeamstats = response.data.teams.home.teamStats.teamSkaterStats
                this.awayteamstats = response.data.teams.away.teamStats.teamSkaterStats
            }
            else {
                console.log('matchup property is a number')
                const response = await nhlService.getMatchupBoxScore(matchup)
                this.matchboxscore = response.data
                this.hometeamstats = response.data.teams.home.teamStats.teamSkaterStats
                this.awayteamstats = response.data.teams.away.teamStats.teamSkaterStats
            }
            // this.matchboxscore = response.data
            // this.hometeamstats = response.data.teams.home.teamStats.teamSkaterStats
            // this.awayteamstats = response.data.teams.away.teamStats.teamSkaterStats
        },

        // async showNewMatchup(matchup){
        //     console.log('showNewMatchup in matchup.vue matchup is: ' + typeof(matchup));
        //     const response = await nhlService.getMatchupBoxScore(matchup)
        //     this.matchboxscore = response.data
        // },
        gotoNextMatchup(nextgame = false){
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
            console.log('MATCHUP - goToNextMatchup this.theselectedteam is: ' + this.theselectedteam);
            console.log(this.$store.state.gamepks[this.gameCount])
            //console.log('gotonextmatchup this.$store.state.gamepks[this.gameCount] is - ' + this.$store.state.gamepks[this.gameCount]);
            this.getMatchup(this.$store.state.gamepks[this.gameCount]);
        },
        gotoFranchise(url, teamid){
            console.log('gotoFranchise - teamid is: ' + teamid)
            this.showselectedfranchise(teamid)
            //this.showselectedfranchise(teamid)
            this.clickTextLink(url)
        },
        clickTextLink(url){
            this.url = url;
            this.changethepagenumber(4);
            router.push(url)
            console.log('this page is: ' + this.teamid + ' url is: ' + url)
        }
    }
}
</script>

<style lang="scss" scoped>

@import "../styles/styles.scss";

a {
  text-decoration:none;
}

.vcontainer{
  padding:0;
  height: calc(100vh - 60px);
}

.breadcrumb-container{
    background-color:$secondary;
    //max-height:100px;
}

.team-title{
    //max-height:800px;
    //background-color:$primary;
    color: $primary;
    font-size:3rem;
}



.vlayout{
  height: calc(100vh - 148px);
}

ul.breadcrumb {
    padding: 0px 0px;
    margin-top:30px;
    list-style: none;
    //background-color:$primary;
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
.bg-primary{ 
    background-color:$primary
}
.bg-secondary{ 
    background-color: $secondary;
}
.bg-accent{ 
    background-color: $accent;
}
.bg-success{ 
    background-color: $success;
}
.bg-info{ 
    background-color:$info;
}
.bg-warning{ 
    background-color: $warning;
}
.bg-error{ 
    background-color: $error;
}

.matchup-background{
    //background-color:$dark;
}
.statresult{
    margin:4px;
    padding:4px;
    background-color:$dark;
    color:$light;
}
.nextprev-button-layout{
    margin-top:40px;
}
.logo{
    // width:28em;
    width:100vw;
    height:auto;
}

@media only screen and (min-width: 320px){
  .container{
    max-width: 300px;
  }
  .matchuppage{
    height: 100%;
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
  .logo{
        width:10em;
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
  .vcontainer{
    display:flex;
    justify-content:center;
    align-items:center;
    height: calc(100vh - 60px);
  }
  .logo{
    // width:28em;
    //width:100vw;
    width:90%;
    height:auto;
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
