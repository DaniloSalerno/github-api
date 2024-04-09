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
        this.state.fetchData(`https://api.github.com/search/${this.state.type}?q=${this.state.searched}`);
      }, 700);
    },


  },
  created() {
    console.log(this.state.type, this.state.searched);
  }

}
</script>

<template>

  <div class="container py-3">
    <div class="d-flex gap-5 align-items-center">


      <input type="text" placeholder="Search users by name" class="form-control" v-model="this.state.searched"
        :class="this.state.invalidInput ? 'invalidInput' : ''" @keyup="keyup()" maxlength="20">
      <!-- /input -->

      <select name="type" id="type" class="form-select" v-model="this.state.type">

        <option value="repositories" selected>Repositories</option>
        <option value="users">Users</option>

      </select>
      <!-- /select -->

      <button @click="this.state.fetchData(`https://api.github.com/search/${this.state.type}?q=${this.state.searched}`)"
        class="button">
        <span class="span">🔎</span>
      </button>
    </div>

    <div v-if="this.state.invalidInput" class="text-danger">Devi digitare almeno 3 caratteri</div>
  </div>

</template>

<style lang="scss" scoped>
input {
  width: 14rem;
}

#type {
  width: 9rem;
}

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

/* BUTTON SEARCH */
.button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e8e8e8;
  background-color: #212121;
  font-size: 24px;
  text-transform: uppercase;
  border: 2px solid #212121;
  border-radius: 10px;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
  box-shadow: 5px 5px 2px rgba(0, 0, 0, 0.15),
    2px 2px 2px rgba(0, 0, 0, 0.1),
    -3px -3px 2px rgba(255, 255, 255, 0.05),
    -2px -2px 1px rgba(255, 255, 255, 0.05);
  overflow: hidden;
  cursor: pointer;
}

.button .span {
  position: relative;
  z-index: 2;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
}

.button::before {
  content: "";
  position: absolute;
  background-color: #e8e8e8;
  width: 100%;
  height: 100%;
  left: 0%;
  bottom: 0%;
  transform: translate(-100%, 100%);
  border-radius: 10px;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
}

.button:hover::before {
  transform: translate(0, 0);
  transition-delay: 0.4s;
}

.button:hover .span {
  scale: 1.2;
}

.button:hover {
  box-shadow: none;
}

.button:active {
  scale: 0.95;
}
</style>