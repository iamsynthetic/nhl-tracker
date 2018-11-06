  <template>
  <div class="page">
    <app-header></app-header>
    <app-schedulepagev2 class="thebg" color="grey darken-4"></app-schedulepagev2>
  </div>
</template>

<script>

import Header from '../components/Header.vue'
import SchedulePagev2 from '../components/SchedulePagev2.vue'

export default {
  name: 'Home',
  components: {
    'appHeader': Header,
    'appSchedulepagev2': SchedulePagev2
  }
}
</script>

<style lang="scss" scoped>

@import "../styles/styles.scss";

.thebg{
        // height:calc(100vh - 60px);
        // width:calc(100vw);
        // background-image: url("/static/bg.jpg");
        // background-position: center;
        // background-repeat: no-repeat;
        // background-size: cover;
        //background-color:$offwhite
    }

</style>