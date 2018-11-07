<template>
    <v-content class="matchuppage">
        <v-container class="vcontainer" grid-list-md>
            <v-breadcrumbs class="breadcrumbs" :items="items" divider=">"></v-breadcrumbs>
            <v-layout row wrap>
                <v-flex class="bg-secondary" xs1 text-xs-center>
                    <v-btn fab dark small color="primary" @click="gotoNextMatchup(false)">
                        <v-icon dark>remove</v-icon>
                    </v-btn>
                </v-flex>
                <v-flex class="bg-primary" xs10>
                    <v-layout row wrap>
                        <v-flex class="bg-primary" xs12 md5 text-xs-center>
                            <img class="logo" :src="`../../static/logos/${matchboxscore.teams.away.team.id}.png`" alt="">
                            <v-layout row wrap>
                                <v-flex class="bg-secondary" xs12>
                                    <p>{{ matchboxscore.teams.away.team.name }}</p>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex class="bg-error" xs12 md2 text-xs-center>
                            <p>VS</p>
                        </v-flex>
                        <v-flex class="bg-success" xs12 md5 text-xs-center>
                            <img class="logo" :src="`../../static/logos/${matchboxscore.teams.home.team.id}.png`" alt="">
                            <v-layout row wrap>
                                <v-flex class="bg-secondary" xs12>
                                    <p>{{ matchboxscore.teams.home.team.name }}</p>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap text-xs-center>
                        <v-flex class="bg-info" xs12 md5>
                            <p>{{ awayteamstats.goals }}</p>
                            <p>{{ awayteamstats.shots }}</p>
                            <p>{{ awayteamstats.powerPlayGoals }}/{{ awayteamstats.powerPlayOpportunities }}</p>
                            <p>{{ awayteamstats.powerPlayPercentage }}</p>
                            <p>{{ awayteamstats.powerPlayPercentage }}</p>
                            <p>{{ awayteamstats.faceOffWinPercentage }}</p>
                            <p>{{ awayteamstats.blocked }}</p>
                            <p>{{ awayteamstats.takeaways }}</p>
                            <p>{{ awayteamstats.giveaways }}</p>
                            <p>{{ awayteamstats.hits }}</p>
                        </v-flex>
                        <v-flex class="bg-warning" xs12 md2>
                            <p>GOALS</p>
                            <p>SHOTS</p>
                            <p>PIM</p>
                            <p>PP</p>
                            <p>PP % </p>
                            <p>FO %</p>
                            <p>BLOCKS</p>
                            <p>TAKEAWAYS</p>
                            <p>GIVEAWAYS</p>
                            <p>HITS</p>
                        </v-flex>
                        <v-flex class="bg-info" xs12 md5>
                            <p>{{ hometeamstats.goals }}</p>
                            <p>{{ hometeamstats.shots }}</p>
                            <p>{{ hometeamstats.powerPlayGoals }}/{{ hometeamstats.powerPlayOpportunities }}</p>
                            <p>{{ hometeamstats.powerPlayPercentage }}</p>
                            <p>{{ hometeamstats.powerPlayPercentage }}</p>
                            <p>{{ hometeamstats.faceOffWinPercentage }}</p>
                            <p>{{ hometeamstats.blocked }}</p>
                            <p>{{ hometeamstats.takeaways }}</p>
                            <p>{{ hometeamstats.giveaways }}</p>
                            <p>{{ hometeamstats.hits }}</p>
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
    name: 'Matchup',
    data(){
        return{
            matchboxscore: [],
            hometeamstats: [],
            awayteamstats: [],
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
        }
    },
    methods: {
        
        setGameCount(){
            this.gameCount = this.$store.state.gamenumber;
            // this.thehometeamid();
            // this.awayteamid();
        },
        async getMatchup(matchup){
            console.log(typeof(matchup));
            if(isNaN(matchup)){
                console.log('getmatchup in matchup.vue this.thematchgamepk is: ' + this.thematchgamepk);
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
            this.getMatchup(this.$store.state.gamepks[this.gameCount]);
        },
        clickTextLink(url, teamid){
        //     function doRouter(){
        //         router.push(url)
        //         console.log('this page is: ' + this.name + ' url is: ' + url)
        //     }
        // }
            this.url = url;
            this.teamid = teamid;
            console.log('click function - this.teamid is: ' + this.teamid);

            router.push(url)
            console.log('this page is: ' + this.name + ' url is: ' + url)
        }
    }
}
</script>

<style lang="scss" scoped>

@import "../styles/styles.scss";

.breadcrumbs{
    padding-left:0px;
    padding-right:0px;
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
