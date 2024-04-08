<script>
import { state } from '../state'
import AppCard from './AppCard.vue';

export default {
  name: 'AppList',

  components: {
    AppCard
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

      <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3 py-5">

        <AppCard :element="element" v-for="element in this.state.data"/>

      </div>

    </div>

  </div>
    
</template>

<style lang="scss" scoped>

</style>