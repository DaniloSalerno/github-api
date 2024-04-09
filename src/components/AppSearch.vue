<script>
import { state } from '../state'

export default {
  name: 'AppSearch',

  data() {
    return {
      state,
      typingTimer: null
    }

  },
  methods: {
    keyup() {
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(() => {
        this.state.fetchData();
      }, 700);
    },


  },
  created() {
    console.log(this.state.type, this.state.searched);
  }

}
</script>

<template>

  <div class="d-flex">
    <input type="text" placeholder="Search users by name" v-model="this.state.searched"
      :class="this.state.invalidInput ? 'invalidInput' : ''" @keyup="keyup()">
    <div v-if="this.state.invalidInput" class="text-danger">Devi digitare almeno 3 caratteri</div>
    <select name="type" id="type" v-model="this.state.type">
      <option value="repositories" selected>Repositories</option>
      <option value="users">Users</option>
    </select>

    <button @click="this.state.fetchData()" class="btn btn-light">Search</button>
  </div>

</template>

<style lang="scss" scoped>
.invalidInput {
  animation: shake 300ms;
  border: 2px solid red;
}

@keyframes shake {

  0%,
  100% {
    transform: translate(0);
  }

  25% {
    transform: translate(0.125rem);
  }

  75% {
    transform: translate(-0.125rem);
  }
}
</style>