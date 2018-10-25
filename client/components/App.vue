<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Home from '../views/Home.vue'

export default {
  name: 'App',
  components: {
    'appHome': Home
  }
};
</script>

<style lang="scss" scoped> 
@import "../../node_modules/uikit3-extra-widths/uikit3/width-ex";
@import '../styles/styles.scss';



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
.search-wrapper {
  margin: 20px;
}
.badge {
  border-radius: 0;
}

.page {
  text-align: center;
  color:!important #ff0000;
  /* nesting for the need to test postcss */
  code {
    //background-color: #f0f0f0;
    padding: 3px 5px;
    border-radius: 2px;
  }
}
</style>
