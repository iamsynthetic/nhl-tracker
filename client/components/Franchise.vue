<template>
    <v-content class="franchisepage">
        <v-container class="vcontainer" grid-list-md>
            <v-layout v-if="franchisestats.team" row wrap>
                <v-flex class="bg-secondary" xs1 text-xs-center>
                    <v-btn fab dark small color="primary" @click="gotoNextMatchup(false)">
                        <v-icon dark>remove</v-icon>
                    </v-btn>
                </v-flex>
                <v-flex class="bg-primary" xs10>
                    <v-layout row wrap>
                        <v-flex class="bg-primary" xs12 md5 text-xs-center>
                            <a><img class="logo" :src="`../../static/logos/${franchisestats.team.id}.png`" alt=""></a>
                            <v-layout row wrap>
                                <v-flex class="bg-secondary" xs12>
                                    <p>{{ franchisestats.team.name }}</p>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap text-xs-center>
                        <v-flex class="bg-info" xs12 md5>
                            {{ franchisestats.stat }}
                            <p>GAMES PLAYED - {{ franchisestats.stat.gamesPlayed }}</p>
                            <p>WINS - {{ franchisestats.stat.wins }}</p>
                            <p>LOSSES - {{ franchisestats.stat.losses }}</p>
                            <p>OVERTIME LOSSES - {{ franchisestats.stat.ot }}</p>
                            <p>POINTS - {{ franchisestats.stat.pts }}</p>
                            <p>POINT % - {{ franchisestats.stat.ptPctg }}</p>
                            <p>GOALS PER GAME - {{ franchisestats.stat.goalsPerGame }}</p>
                            <p>GOALS AGAINST PER GAME - {{ franchisestats.stat.goalsAgainstPerGame }}</p>
                            <p>POWER PLAY % - {{ franchisestats.stat.powerPlayPercentage }}</p>
                            <p>POWER PLAY GOALS - {{ franchisestats.stat.powerPlayGoals }}</p>
                            <p>POWER PLAY GOALS AGAINST - {{ franchisestats.stat.powerPlayGoalsAgainst }}</p>
                            <p>POWER PLAYS - {{ franchisestats.stat.powerPlayOpportunities }}</p>
                            <p>PENALTY KILL % - {{ franchisestats.stat.penaltyKillPercentage }}</p>
                            <p>SHOTS PER GAME - {{ franchisestats.stat.shotsPerGame }}</p>
                            <p>SHOTS ALLOWED - {{ franchisestats.stat.shotsAllowed }}</p>
                            <p>WINS WHEN SCORED FIRST - {{ franchisestats.stat.winScoreFirst }}</p>
                            <p>WINS WHEN SCORED ON FIRST - {{ franchisestats.stat.winOppScoreFirst }}</p>
                            <p>WINS AFTER 1ST PERIOD LEAD - {{ franchisestats.stat.winLeadFirstPer }}</p>
                            <p>WINS AFTER 2ND PERIOD LEAD - {{ franchisestats.stat.winLeadSecondPer }}</p>
                            <p>WINS WHEN OUTSHOOT OPPONENT - {{ franchisestats.stat.winOutshootOpp }}</p>
                            <p>FACEOFFS TAKEN - {{ franchisestats.stat.faceOffsTaken }}</p>
                            <p>FACEOFFS WON - {{ franchisestats.stat.faceOffsWon }}</p>
                            <p>FACEOFFS LOST - {{ franchisestats.stat.faceOffsLost }}</p>
                            <p>FACEOFF WIN % - {{ franchisestats.stat.faceOffWinPercentage }}</p>
                            <p>SHOOTING % - {{ franchisestats.stat.shootingPctg }}</p>
                            <p>SAVE % - {{ franchisestats.stat.savePctg }}</p>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex class="bg-secondary" xs1 text-xs-center>
                    <v-btn fab dark small color="primary" @click="gotoNextMatchup(true)">
                        <v-icon dark>add</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
import axios from 'axios'
import router from '../router'
import nhlService from '../services/nhlService'

export default {
    name: 'Franchise',
    data() {
        return {
            franchise: [],
            franchisestats: [],
            franchiserank: [],
            gameCount: 0
        }
    },
    mounted(){

    },
    created(){
        this.getNHLTeamSeasonStats();
        this.setGameCount();
    },
    beforeDestroy(){

    },
    computed:{
        theawayteamid: function(){
            return this.$store.state.awayteamid
        },
        theselectedfranchise: function(){
            return this.$store.state.selectedfranchiseid
        }
    },
    methods: {
        setGameCount(){
           this.gameCount = this.$store.state.gamenumber;
        },
        async getNHLTeamSeasonStats(matchup){
            console.log(typeof(matchup));
            if(isNaN(matchup)){
                console.log('getNHLTeamSeasonStats matchup is: ' + matchup)
                console.log('getNHLTeamSeasonStats theselectedfranchise is: ' + this.theselectedfranchise)
                const response = await nhlService.getTeamSeasonStats(this.theselectedfranchise)
                this.franchise = response.data
                this.franchisestats = response.data.stats[0].splits[0]
                this.franchiserank = response.data.stats[1].splits[0]
            }
            else {
                console.log('matchup property is a number')
                const response = await nhlService.getTeamSeasonStats(this.theselectedfranchise)
                this.franchise = response.data
                this.franchisestats = response.data.stats[0].splits[0]
                this.franchiserank = response.data.stats[1].splits[0]
            }
        },
        gotoNextMatchup(nextgame = false){
            if(nextgame == false){
                if(this.gameCount == 1){
                    //do nothing
                }else{
                    //go to previous game
                    this.gameCount--;
                }
            }
            else if(nextgame == true)
            {
                if(this.gameCount == 31){
                    //do nothing
                }else{
                    //go to the next game
                    this.gameCount++;
                }
            }
            console.log('MATCHUP - goToNextMatchup this.theselectedteam is: ' + this.theselectedfranchise);
            console.log(this.$store.state.gamepks[this.gameCount])
            this.getNHLTeamSeasonStats(this.$store.state.selectedfranchiseid);
        }
    },
}
</script>

<style lang="scss" scoped>

@import "../styles/styles.scss";

ul.breadcrumb {
    padding: 10px 12px;
    list-style: none;
}
ul.breadcrumb li {
    display: inline;
    font-size: 14px;
    // color: #b3d4fc;
    color: rgba(0,0,0,.38);
}
ul.breadcrumb li+li:before {
    padding-left: 9px;
    padding-right:9px;
    //color: #b3d4fc;
    color: rgba(0,0,0,.38);
    content: "\003e";
}
ul.breadcrumb li a {
    color: #0275d8;
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
.logo{
    width:28em;
}

@media only screen and (max-width: 600px) {
    .logo{
        width:10em;
    }
}
</style>
