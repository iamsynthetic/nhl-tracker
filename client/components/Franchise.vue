<template>
    <v-content class="franchisepage">
        <v-container grid-list-md>
            <v-layout class="vlayout" v-if="franchisestats.team" row wrap>
                <v-flex class="bg-secondary" xs1 text-xs-center>
                    <v-btn fab dark small color="primary" @click="gotoNextStat(false)">
                        <v-icon dark>remove</v-icon>
                    </v-btn>
                </v-flex>
                <v-flex xs10>
                    <!-- <v-layout row wrap>
                        <v-flex class="logocontainer" xs6 text-xs-center>
                            <img class="thelogo" :src="`../../static/logos/${franchisestats.team.id}.png`" alt="">
                        </v-flex>
                        <v-flex class="textcontainer" xs6 text-xs-center>
                            <p class="thetitle">{{franchisestats.team.name}}<br><span class="thesubtitle">2018 - 2019 season stats</span></p>
                        </v-flex>
                    </v-layout> -->
                    <v-layout row wrap>
                        <v-flex text-xs-center>
                            <a><img class="logo" :src="`../../static/logos/${franchisestats.team.id}.png`" alt=""></a>
                            <p class="team-title">{{ franchisestats.team.name }}</p>
                            <p>stats - {{ franchisestats.stat }}</p>
                            <p>ranks - {{ franchiserank.stat["wins"] }}</p>
                            <p>{{ getstatname(1) }} is {{ getstat(1) }}</p>
                            <p>GAMES PLAYED - {{ franchisestats.stat.gamesPlayed }}</p>
                            <v-progress-linear background-color="pink lighten-3" color="pink lighten-1" v-model="gamesplayed"></v-progress-linear>
                            
                        </v-flex>
                    </v-layout>
                </v-flex>
                
                <!-- <v-flex class="bg-primary" xs10>
                    <v-layout row wrap>
                        <v-flex class="bg-primary" xs12 md5 my-auto text-xs-center>
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
                            
                            overall game stats
                            
                            <p>GAMES PLAYED - {{ franchisestats.stat.gamesPlayed }}</p>
                            <p>WINS - {{ franchisestats.stat.wins }}</p>
                            <p>LOSSES - {{ franchisestats.stat.losses }}</p>
                            <p>OVERTIME LOSSES - {{ franchisestats.stat.ot }}</p>
                            <p>POINTS - {{ franchisestats.stat.pts }}</p>
                            <p>POINT % - {{ franchisestats.stat.ptPctg }}</p>
                            
                            offensive stats

                            <p>GOALS PER GAME - {{ franchisestats.stat.goalsPerGame }}</p>
                            <p>GOALS AGAINST PER GAME - {{ franchisestats.stat.goalsAgainstPerGame }}</p>
                            <p>SHOTS PER GAME - {{ franchisestats.stat.shotsPerGame }}</p>
                            <p>SHOTS ALLOWED - {{ franchisestats.stat.shotsAllowed }}</p>
                            
                            shooting 

                            <p>SHOOTING % - {{ franchisestats.stat.shootingPctg }}</p>
                            <p>SAVE % - {{ franchisestats.stat.savePctg }}</p>
                            
                            special teams stats

                            <p>POWER PLAY % - {{ franchisestats.stat.powerPlayPercentage }}</p>
                            <p>POWER PLAY GOALS - {{ franchisestats.stat.powerPlayGoals }}</p>
                            <p>POWER PLAY GOALS AGAINST - {{ franchisestats.stat.powerPlayGoalsAgainst }}</p>
                            <p>POWER PLAYS - {{ franchisestats.stat.powerPlayOpportunities }}</p>
                            <p>PENALTY KILL % - {{ franchisestats.stat.penaltyKillPercentage }}</p>
                            
                            draws

                            <p>FACEOFFS TAKEN - {{ franchisestats.stat.faceOffsTaken }}</p>
                            <p>FACEOFFS WON - {{ franchisestats.stat.faceOffsWon }}</p>
                            <p>FACEOFFS LOST - {{ franchisestats.stat.faceOffsLost }}</p>
                            <p>FACEOFF WIN % - {{ franchisestats.stat.faceOffWinPercentage }}</p>

                            wins special stats

                            <p>WINS WHEN SCORED FIRST - {{ franchisestats.stat.winScoreFirst }}</p>
                            <p>WINS WHEN SCORED ON FIRST - {{ franchisestats.stat.winOppScoreFirst }}</p>
                            <p>WINS AFTER 1ST PERIOD LEAD - {{ franchisestats.stat.winLeadFirstPer }}</p>
                            <p>WINS AFTER 2ND PERIOD LEAD - {{ franchisestats.stat.winLeadSecondPer }}</p>
                            <p>WINS WHEN OUTSHOOT OPPONENT - {{ franchisestats.stat.winOutshootOpp }}</p>
                            
                        </v-flex>
                    </v-layout>
                </v-flex> -->
                <v-flex class="bg-secondary" xs1 text-xs-center>
                    <v-btn fab dark small color="primary" @click="gotoNextStat(true)">
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
            statCount: 0,
            entriesmap: {},
            objectkeynames: [],
            gamesplayed: ""
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
                const keys = Object.keys(response.data.stats[0].splits[0].stat)
                const entries = Object.entries(response.data.stats[0].splits[0].stat)
                this.entriesmap = new Map(Object.entries(response.data.stats[0].splits[0].stat))
                this.gamesplayed = String((Number(response.data.stats[0].splits[0].stat.gamesPlayed) / 82) * 100)
                console.log('keys is: ' + keys)
                console.log('entries is: ' + entries)

                for (const [key, count] of entries){
                    console.log(`There are ${count} ${key}`)
                    this.objectkeynames.push(key)
                }

                console.log('blah - ' + response.data.stats[1].splits[0].stat[1])
                
                console.log('entries map')
                console.log('entries map - size: ' + this.entriesmap.size)
                console.log('entries map - has wins: ' + this.entriesmap.has('wins'))
                console.log('entries map - get wins: ' + this.entriesmap.get('wins'))
                console.log('entries map - get wins: ' + this.entriesmap.get([1]))
                
                console.log('objectkeynames are: ' + this.objectkeynames)

                console.log('entries map - get wins by objectkeyname array: ' + this.entriesmap.get(this.objectkeynames[1]))
                console.log('entries map - get ' + this.objectkeynames[1] + ' by objectkeyname array son: ' + this.entriesmap.get(this.objectkeynames[1]))
            }
            else {
                console.log('matchup property is a number')
                const response = await nhlService.getTeamSeasonStats(this.theselectedfranchise)
                this.franchise = response.data
                this.franchisestats = response.data.stats[0].splits[0]
                this.franchiserank = response.data.stats[1].splits[0]
            }
        },
        getstatname(statname){
            return this.objectkeynames[statname]
        },
        getstat(stat){
            return this.entriesmap.get(this.objectkeynames[stat])
        },
        gotoNextStat(nextstat = false){
            if(nextstat == false){
                if(this.statCount == 1){
                    //do nothing
                }else{
                    //go to previous game
                    this.statCount--;
                }
            }
            else if(nextstat == true)
            {
                if(this.statCount == 31){
                    //do nothing
                }else{
                    //go to the next game
                    this.statCount++;
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

.vlayout{
  height: calc(100vh - 144px);
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
    width:14rem;
}
.team-title{
    font-size:3rem;
}
.v-progress-linear{
    margin: 1rem
}
@media only screen and (max-width: 600px) {
    
}
</style>
