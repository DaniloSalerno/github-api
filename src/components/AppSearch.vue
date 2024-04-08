<script>
import { state } from '../state'

export default {
  name: 'AppSearch',

  data() {
    return {
        state,
    }

  },
  created() {
    console.log(this.state.type, this.state.searched);
  }
 
}
</script>

<template>

    <div class="d-flex">
        <input type="text" placeholder="Search users by name" v-model="this.state.searched">
            <select
                name="type"
                id="type"
                v-model="this.state.type"
            >
                <option value="repositories" selected >Repositories</option>
                <option value="users">Users</option>
            </select>
        
        <button @click="this.state.fetchData()">Search</button>
    </div>
  
</template>

<style lang="scss" scoped>

</style>