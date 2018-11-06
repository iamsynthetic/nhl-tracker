<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import Home from '../views/Home.vue'
import Header from './Header.vue'

export default {
  name: 'App',
  components: {
    'appHeader': Header,
    'appHome': Home
  },
  data(){
    return{
    
    }
  },
  created(){
    //  [App.vue specific] When App.vue is first loaded start the progress bar
      this.$Progress.start()
      //  hook the progress bar to start before we move router-view
      this.$router.beforeEach((to, from, next) => {
        //  does the page we want to go to have a meta.progress object
        if (to.meta.progress !== undefined) {
          let meta = to.meta.progress
          // parse meta tags
          this.$Progress.parseMeta(meta)
        }
        //  start the progress bar
        this.$Progress.start()
        //  continue to next page
        next()
      })
      //  hook the progress bar to finish after we've finished moving router-view
      this.$router.afterEach((to, from) => {
        //  finish the progress bar
        this.$Progress.finish()
      })
  }
};
</script>

<style lang="scss" scoped> 
@import '../styles/styles.scss';

body {
    overflow-y:hidden;
}

// html {
//   color:!important #ff0000;
// }
// body {
//   margin: 0;
//   color:!important #ff0000;
//   font-size: 5rem;
//   font-color:#ffffff;
//   font-family: -apple-system, BlinkMacSystemFont,
//                'avenir next', avenir,
//                helvetica, 'helvetica neue',
//                Ubuntu,
//                'segoe ui', arial,
//                sans-serif;
// }

#app {
  margin-top: 0px;
  height:100%;
  background-color:!important #ff0000;
}
</style>
