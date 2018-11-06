<template>
    <div class="matchuppage">
        <v-container class="vcontainer">
            <!-- <v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
            <p>test here</p>
            <p>team id is: {{ teamid }}</p> -->
            <p>matchup page</p>
            <p>home team is {{ hometeamid }}</p>
            <p>away team is {{ awayteamid }}</p>
            <p>matchup date is {{ matchupdate }}</p>
            <p>golden knights wins and loses are: {{ matchup.dates[0].games[0].teams.away.leagueRecord.wins }} - {{ matchup.dates[0].games[0].teams.away.leagueRecord.losses }} - {{ matchup.dates[0].games[0].teams.away.leagueRecord.ot }}</p>
            <!-- <p>matchup info {{ matchup }}</p> -->
        </v-container>
    </div>
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
            matchup:[],
            url:"",
        }
    },
    mounted(){
    },
    created(){
        //this.$eventHub.$emit('sectionChange', this.name);
        this.$eventHub.$on('Matchup', this.thaurls);
        // this.getNHLData();
        // this.getNHLSchedule();
        this.getMatchup();
    },
    beforeDestroy(){
        //this.$eventHub.$off('sectionChange', this.name);
        this.$eventHub.$off('Matchup', this.clickTextLink);
    },
    computed: {
        ...mapState([
            'hometeamid',
            'awayteamid',
            'matchupdate'
        ]),

        thehometeamid: function(){
            return this.$store.state.hometeamid
        },
        theawayteamid: function(){
            return this.$store.state.awayteamid
        },
        thematchupdate: function(){
            return this.$store.state.matchupdate
        }
    },
    methods: {
        // async getNHLData(){
        //     const response = await nhlService.getATeam(this.theteamid)
        //     this.nhldata = response.data
        // },
        // async getNHLSchedule(){
        //     const response = await nhlService.getTeamSchedule(this.theteamid)
        //     this.nhlschedule = response.data
        // },
        async getMatchup(){
            const response = await nhlService.getMatchup(this.thehometeamid, this.thematchupdate)
            this.matchup = response.data
            console.log(response)
        },
        getTime(thedate){
            console.log('dateNow is: ' + this.dateNow);
            console.log('thedate is: ' + thedate);
            this.dateNow = new Date().getFullYear()
            console.log('dateNow now is: ' + this.dateNow);
            console.log('thedate now is: ' + thedate);
            return this.dateNow;
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

.vcontainer{
    
}
</style>
