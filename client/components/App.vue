<template>
  <div id="app">
    <div v-if="this.$store.getters.checkpagenumber === 1">
    </div>
    <div v-if="this.$store.getters.checkpagenumber >= 2" class="breadcrumb">
        <app-breadcrumb class="bread"></app-breadcrumb>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './Header.vue'
import Breadcrumb from './Breadcrumb.vue'

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
    'appBreadcrumb': Breadcrumb
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
.bread{
}
</style>
