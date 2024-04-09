<script>
import { state } from '../state'
import AppCard from './AppCard.vue';
import AppLoader from './AppLoader.vue';

export default {
  name: 'AppList',

  components: {
    AppCard,
    AppLoader
  },

  data() {
    return {
      state,
    }

  }
}
</script>

<template>

  <div id="list">

    <div class="container">

      <!-- Se loader è true visuliazziamo il loader -->
      <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3 py-5" v-if="this.state.loader">

        <AppLoader v-for="n in 20" />

      </div>

      <!-- Se loader è false e abbiamo risultati visualizziamo i risultati -->
      <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3 py-5"
        v-else-if="!this.state.dataEmpty && !this.state.loader">

        <AppCard :element="element" v-for="element in this.state.data" />

      </div>

      <!-- Altrimenti visualizziamo un messaggio -->
      <div v-else>
        <h1 class="text-danger">Nessun risultato trovato</h1>
      </div>

    </div>

  </div>

</template>

<style lang="scss" scoped></style>