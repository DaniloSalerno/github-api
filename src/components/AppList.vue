<script>
import { state } from '../state'

export default {
  name: 'AppList',

  data() {
    return {
        state,
    }

  }
}
</script>

<template>

<div v-for="element in this.state.data">
{{ this.state.type === 'repositories' ? element.name : element.login }}
</div>
    
</template>

<style lang="scss" scoped>

</style>