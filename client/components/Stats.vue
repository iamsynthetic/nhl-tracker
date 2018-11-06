<template>
  <div class="stats">
    <app-header></app-header>
    <h1>A different compoennt</h1>
    <p>there are currently {{ countLinks }} links</p>
    <button @click="removeAllLinks">Remove all links</button>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'Stats',
  computed:{
    ...mapGetters([
      'countLinks'
    ])
  },
  data(){
    return{
      msg: ''
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
  },
  methods:{
    ...mapMutations(['REMOVE_ALL']),
    ...mapActions(['removeAll']),
    removeAllLinks(){
      this.removeAll().then(() => {
        this.msg = 'They have been removed'
      })
    }
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

button {
  padding: 10px;
  margin-top: 30px;
  width: 100%;
  background: none;
  border: 1px solid lightgrey;
  outline: 0;
  cursor: pointer;
}
</style>
