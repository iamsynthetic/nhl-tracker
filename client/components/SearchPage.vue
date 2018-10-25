<template>
    <div>
    <!-- </div>
      {{ filteredData }}
    </div> -->
    <div>
      {{ nhldata.teams[0].name }}
      {{ nhlschedule.dates[0].games[0].teams.home.team.name }}
      <!-- {{ filteredData }} -->
    </div>
        <div class="search-wrapper uk-container-expand">
            <form>
                <div class="form-row">
                    <div class="uk-align-center">
                        <!-- <input type="text" class="form-control" placeholder="Enter key word" v-model="search" v-on:keyup="getfilteredData"> -->
                        <!-- <button type="submit" class="btn btn-primary"><i class="fa fa-search">search</i></button> -->
                    </div>
                </div>
            </form>
        </div>
        <div v-if="loading">
          <img src="../../static/loading.gif"/>
          Loading.....
        </div>
        <div class="card-columns uk-align-center">
            <vk-grid matched gutter="medium">
                <!-- <item-card class="uk-width-1-4@m" v-for="(item, index) in filteredData" :key="index" :item="item"></item-card> -->
                <item-card class="uk-width-1-4@m" v-for="(item, index) in nhldata.teams" :key="index" :item="item"></item-card>
            </vk-grid>
        </div>
        <!-- <div class="card-columns uk-align-center">
            <div id="example-1">
              <vk-grid v-for="item in nhlschedule.dates[0].games">
                {{ item.teams.away.team.name }} {{ item.teams.away.leagueRecord.wins }} - {{ item.teams.away.leagueRecord.losses }} - {{ item.teams.away.leagueRecord.ot }} vs {{ item.teams.home.team.name }} {{ item.teams.home.leagueRecord.wins }} - {{ item.teams.home.leagueRecord.losses }} - {{ item.teams.home.leagueRecord.ot }}
              </vk-grid>
            </div>
        </div> -->
        <div class="card-columns uk-align-center">
            <div id="example-1">
              <vk-grid v-for="item in nhlschedule.dates" :key="item">
                {{ item.games[0].teams.away.team.name }} {{ item.games[0].teams.away.leagueRecord.wins }} - {{ item.games[0].teams.away.leagueRecord.losses }} - {{ item.games[0].teams.away.leagueRecord.ot }} vs {{ item.games[0].teams.home.team.name }} {{ item.games[0].teams.home.leagueRecord.wins }} - {{ item.games[0].teams.home.leagueRecord.losses }} - {{ item.games[0].teams.home.leagueRecord.ot }}<br> {{getTime(item.games[0].gameDate)}}<br><span>{{ item.games[0].gameDate | moment("dddd, MMMM Do YYYY, h:mm a") }}</span>
                <!-- {{ item.games[0].gameDate }} -->
              </vk-grid>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
import vueMoment from 'vue-moment';
import itemCard from './itemCard';
import data from '../data/data';

export default {
  name: 'SearchPage',
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
      nhldata: [],
      nhlschedule: [],
      loading: false,
      dateNow: 'the date here'
    };
  },
  created(){
    this.$eventHub.$on('filterdata', this.clickTextlink);
    this.getNHLData();
    this.getNHLSchedule(10);
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
    getNHLData(){
      console.log('nhl')
      // this.loading = true;
      axios.get("https://statsapi.web.nhl.com/api/v1/teams/")
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
      console.log('nhl')
      // this.loading = true;
      //all games whole season
      axios.get("https://statsapi.web.nhl.com/api/v1/schedule?teamId=" + id + "&startDate=2018-10-03&endDate=2019-04-06")
      //axios.get("https://statsapi.web.nhl.com/api/v1/schedule/")
        .then((response) => {
          console.log('test');
          this.loading = false;
          console.log('test 2');
          console.log('this.nhlschedule is: ' + this.nhlschedule)
          this.nhlschedule = response.data;
          console.log('test 3');
          console.log(this.nhlschedule);
        }, (error) => {
          this.loading = false;
        })
    },

    getTime(thedate){
      console.log('dateNow is: ' + this.dateNow);
      console.log('thedate is: ' + thedate);
      //this.dateNow = new Date(thedate);
      this.dateNow = new Date().getFullYear()
      console.log('dateNow now is: ' + this.dateNow);
      console.log('thedate now is: ' + thedate);
      return this.dateNow;
    },

    // getfilteredData: function() {
    //   this.filteredData = data;
    //   let filteredDataByfilters = [];
    //   let filteredDataBySearch = [];
    //   // first check if filters where selected
    //   if (this.selectedFilters.length > 0) {
    //     filteredDataByfilters= this.filteredData.filter(obj => this.selectedFilters.every(val => obj.stack.indexOf(val) >= 0));
    //     this.filteredData = filteredDataByfilters;
    //   }
    //   // then filter according to keyword, for now this only affects the name attribute of each data
    //   if (this.search !== '') {
    //     filteredDataBySearch = this.filteredData.filter(obj => obj.name.indexOf(this.search.toLowerCase()) >= 0);
    //     this.filteredData = filteredDataBySearch;
    //   }
    //   // console.log('filtered data is: ' + this.filteredData);
    //   // this.$eventHub.$emit('filter', this.filteredData);
    // },
    clickTextlink(thedata){
      console.log('this work?');
      console.log('thedata is: ' + thedata);
      this.filteredData = thedata;
      console.log('this.filteredData is: ' + this.filteredData)
    }
  }
};
</script>

<style>
@import "../../node_modules/uikit3-extra-widths/uikit3/width-ex";

.search-wrapper{
  /* margin-left:75px; */
}
.form-check{
    /* width:150px; */
}

.form-check-label{
    font-size:14px;
}

</style>