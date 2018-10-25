  <template>
  <div class="page">
    <app-header></app-header>
    <app-container></app-container>
  </div>
</template>

<script>

import Header from '../components/Header.vue'
import Container from '../components/Container.vue'

export default {
  name: 'Home',
  components: {
    'appHeader': Header,
    'appContainer': Container
  }
}
</script>
