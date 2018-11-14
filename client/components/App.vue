<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './Header.vue'

export default {
  name: 'App',
  data(){
    return{
    }
  },
  created(){
    
  },
  computed:{
  },
  components: {
    'appHeader': Header,
    //Stats
  },
  methods: {
  }
};
</script>

<style lang="scss"> 
@import '../styles/styles.scss';

body {
  //overflow-y:hidden;
  background-color:$info;
}

#app {
  margin-top: 0px;
  height:100%;
  //background-color:$info;
}
</style>
