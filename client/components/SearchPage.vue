<template>
    <div>
      
      <!-- <div>
        {{ nhldata.teams[0].name }}
        {{ nhlschedule.dates[0].games[0] }}
      </div> -->

      <!-- <div class="card-columns uk-align-right the-cards">
        <div id="parent">
          <vue-scroll :ops="ops">
            <div id="child">
              <vk-grid matched gutter="medium">
                  <item-card class="uk-width-1-1@m" v-for="(item, index) in nhldata.teams" :key="index" :item="item"></item-card>
              </vk-grid>
            </div>
          </vue-scroll>
        </div>
      </div> -->
        
      <div class="card-columns uk-align-right the-cards">
        <div id="parent">
          <vue-scroll :ops="ops">
            <div id="child">
              <vk-grid matched gutter="small" v-for="item in nhlschedule.dates" :key="item">
                <!-- <div class="schedulebox">
                  <<vk-card class="label">{{ item.games[0].teams.home.team.name }}</vk-card>
                </div> -->
                <div class="schedulebox">
                  <vk-grid gutter="collapse" class="uk-child-width-expand@s uk-text-left">
                    <div class="schedulebox1 uk-width-1-6@m">
                      <ul class="scheduleboxitem">
                        <li><p>{{ item.games[0].gameDate | moment("dddd") }}<br>{{ item.games[0].gameDate | moment("MMMM Do YYYY") }}</p></li>
                        <li><p>{{ item.games[0].gameDate | moment("h:mm a") }}</p></li>
                      </ul>
                    </div>
                    <div class="schedulebox2 uk-width-1-12@m">
                      <ul class="scheduleboxitem">
                        <li><div>away logo</div></li>
                      </ul>
                    </div>
                    <div class="schedulebox3 uk-width-1-4@m">
                      <ul class="scheduleboxitem">
                        <li><p>{{ item.games[0].teams.away.team.name }}</p></li>
                        <li><p>{{ item.games[0].teams.away.leagueRecord.wins }} - {{ item.games[0].teams.away.leagueRecord.losses }} - {{ item.games[0].teams.away.leagueRecord.ot }}</p></li>
                      </ul>
                    </div>
                    <div class="schedulebox4 uk-width-1-12@m">
                      <ul class="scheduleboxitem">
                        <li><p>vs</p></li>
                      </ul>
                    </div>
                    <div class="schedulebox5 uk-width-1-4@m">
                      <ul class="scheduleboxitem">
                        <li><p>{{ item.games[0].teams.home.team.name }}</p></li>
                        <li><p>{{ item.games[0].teams.home.leagueRecord.wins }} - {{ item.games[0].teams.home.leagueRecord.losses }} - {{ item.games[0].teams.home.leagueRecord.ot }}</p></li>
                      </ul>
                    </div>
                    <div class="schedulebox6 uk-width-1-12@m">
                      <ul class="scheduleboxitem">
                        <li><div>home logo</div></li>
                      </ul>
                    </div>
                  </vk-grid>
                </div>
              </vk-grid>
            </div>
          </vue-scroll>
        </div>
      </div>
    </div>
    <!-- 
      {{ item.games[0].teams.away.team.name }} {{ item.games[0].teams.away.leagueRecord.wins }} - {{ item.games[0].teams.away.leagueRecord.losses }} - {{ item.games[0].teams.away.leagueRecord.ot }} vs {{ item.games[0].teams.home.team.name }} {{ item.games[0].teams.home.leagueRecord.wins }} - {{ item.games[0].teams.home.leagueRecord.losses }} - {{ item.games[0].teams.home.leagueRecord.ot }}<br> {{getTime(item.games[0].gameDate)}}<br><span>{{ item.games[0].gameDate | moment("dddd, MMMM Do YYYY, h:mm a") }}</span>
    -->
</template>

<script>

import axios from 'axios';
import vueMoment from 'vue-moment';
import itemCard from './itemCard';
import data from '../data/data';
import vuescroll from 'vuescroll';

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
  name: 'SearchPage',
  components: {
    itemCard
  },
  data() {
    return {
      ops: {
        vuescroll: {
          mode: 'native',
          // scrollingX: this.pagingX,
          // scrollingY: !this.pagingX,
          paging: false,
          zooming: false,
          snapping: {
              enable: false
              // width: 100,
              //height: 196
          }
        },
        scroller: {
          bouncing: true,
          speedMultiplier: 2,
          // penetrationDeceleration: 1.13,
          // /** This configures the amount of change applied to acceleration when reaching boundaries  **/
          // penetrationAcceleration: 1.18
          //locking: true
        },
        scrollPanel: {
          scrollingX: false,
          easing: 'easeInOutQuart',
          speed: 600
          // padding: true,
        },
        rail:{
          // gutterOfSide: '-1px',
          // gutterOfEnds: '20px',
        },
        bar: {
          opacity:1,
          background: "rgb(24, 144, 255)"
        }
      },
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

<style lang="scss" scoped>

@import "../../node_modules/uikit3-extra-widths/uikit3/width-ex";
@import "../styles/styles.scss";
//@import "../../node_modules/bootstrap/scss/bootstrap.scss";

.the-cards{
  margin-right:50px;
}

#parent {
  margin-top:20px;
  width: 60vw;
  height: 80vh;
  display: inline-block;
}

  #child {
    width: 60vw;
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

.schedulebox{
  width:97%;
  height:80px;
  background-color:$dark;
}

.label{
  color:$light;
  font-size:16px;
  font-family: 'Fjalla One', sans-serif;
}

.schedulebox1{
  background-color:$green;
}
.schedulebox2{
  
  background-color:$blue;
}
.schedulebox3{
  
  background-color:$yellow;
}
.schedulebox4{
  
  background-color:$orange;
}
.schedulebox5{
  
  background-color:$red;
}
.schedulebox6{
  
  background-color:$lightblue;
}

.scheduleboxitem{
  height:150px;
  list-style:none;
  //line-height:1px;
  //margin-top:10px;
  //background-color:$light;
}

</style>