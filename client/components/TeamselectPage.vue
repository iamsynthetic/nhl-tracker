<template>
    <div class="teamselectpage">
      <v-container grid-list-lg id="scroll-target" class="vcontainer">
        <v-layout row wrap class="vlayout">
          <v-flex v-for="(item, index) in nhlteams" :key="`card-${item.id}`" xs4 md2 @click="clickTextlink('/schedule', item.id)">
            <v-card flat tile>
              <v-img :src="`../../static/logos/${item.id}.png`" contain aspect-ratio="1"></v-img>

              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                </div>
              </v-card-title>
            
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
</template>

<script>

import axios from 'axios';
import itemCard from './itemCard';
import router from '../router'
import nhlService from '../services/nhlService'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'TeamselectPage',
  components: {
    itemCard
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
      nhlteams: [],
      loading: false
    };
  },
  created(){
    this.$eventHub.$on('filterdata', this.clickTextlink);
    this.getNHLData();
    //this.getNHLSchedule(10);
  },
  mounted() {
    // this.getfilteredData();
    
  },
  computed: {
    selectedFilters: function() {
      let filters = [];
      let checkedFiters = this.stacks.filter(obj => obj.checked);
      checkedFiters.forEach(element => {
        filters.push(element.value);
      });
      return filters;
    }
  },
  methods: {
    ...mapMutations(['CHANGE_TEAM_SELECTED']),
    ...mapActions(['changeTeamSelected']),
    
    changetheteamselected(id){
      this.changeTeamSelected(id);
    },
    async getNHLData(){
      console.log(this.theteamid);
      const response = await nhlService.getAllTeams()
      this.nhlteams = response.data.teams
    },

    clickTextlink(url, teamid){
      // console.log('this work?');
      // console.log('thedata is: ' + thedata);
      // this.filteredData = thedata;
      // console.log('this.filteredData is: ' + this.filteredData)

      console.log('teamselectpage url is: ' + url);
      console.log('teamselectpage teamid is: ' + teamid);

      this.changetheteamselected(teamid);
     router.push(url);
    }
  }
};
</script>

<style lang="scss" scoped>

@import "../../node_modules/uikit3-extra-widths/uikit3/width-ex";
@import "../styles/styles.scss";
//@import "../../node_modules/bootstrap/scss/bootstrap.scss";

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
    // width: 60vw;
    width: 700px;
    height: 100%;
    /* background: -webkit-linear-gradient(left top, red, blue); */
    /* Safari 5.1 to 6.0 */
    /* background: -o-linear-gradient(bottom right, red, blue); */
    /* Opera 11.1 to 12.0 */
    /* background: -moz-linear-gradient(bottom right, red, blue); */
    /* Firefox 3.6 to 15 */
    /* background: linear-gradient(to bottom right, red, blue); */
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