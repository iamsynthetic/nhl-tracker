<template>
    <div class="matchuppage">
        <v-container class="vcontainer">
            <v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
            <p>test here</p>
            <p>team id is: {{ teamid }}</p>
        </v-container>
    </div>
</template>

<script>
    import axios from 'axios'
    import router from '../router'
    
export default {
    name: 'Matchup',
    data(){
        return{
            nhldata: [],
            nhlschedule: [],
            url:"",
            teamid: ""
        }
    },
    mounted(){
        
    },
    created(){
        //this.$eventHub.$emit('sectionChange', this.name);
        this.$eventHub.$on('Matchup', this.clickTextlink);
        this.getNHLData();
        this.getNHLSchedule();
    },
    beforeDestroy(){
        //this.$eventHub.$off('sectionChange', this.name);
        this.$eventHub.$off('Matchup', this.clickTextlink);
    },
    methods: {
        getNHLData(){
            console.log('nhl')
            axios.get("teams/")
                .then((response) => {
                console.log('test');
                this.loading = false;
                console.log('test 2');
                console.log('this.nhldata is: ' + this.nhldata)
                this.nhldata = response.data;
                console.log('test 3');
                console.log(this.nhldata);
                }, (error) => {
                this.loading = false;
            })
        },
        getNHLSchedule(id){
            this.teamid = id;
            axios.get("schedule?teamId=" + id + "&startDate=2018-10-03&endDate=2019-04-06")
                .then((response) => {
                this.loading = false;
                console.log('this.nhlschedule is: ' + this.nhlschedule)
                this.nhlschedule = response.data;
                }, (error) => {
                this.loading = false;
            })
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
