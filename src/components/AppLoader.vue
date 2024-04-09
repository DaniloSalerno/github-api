<script>
import { state } from '../state';
export default {
    name: 'AppLoader',

    data() {
        return {
            state,
        }

    }

}
</script>

<template>
    <div class="col">

        <div class="card bg-dark" :class="this.state.type === 'repositories' ? 'repo' : 'user'" aria-hidden="true">

            <div class='img'></div>

            <div class='stripe medium-stripe'></div>

            <div class='stripe long-stripe' v-if="this.state.type === 'repositories'"></div>

            <div class='stripe small-stripe' v-if="this.state.type === 'repositories'"></div>

        </div>

    </div>
</template>

<style lang="scss">
.user {

    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    gap: 1rem;

    height: 100px;
}

.repo {
    height: 250px;

    flex-direction: column;


}

.img {
    border: 1px solid white;
    margin: 0 auto;
    width: 75px;
    height: 75px;
    background-color: #babbbc;
}

.stripe {
    border: 1px solid white;
    margin: 1rem 0;
    height: 1.25rem;
    background-color: #babbbc;
}

.small-stripe {

    margin-top: auto;
    width: 20%;
}

.medium-stripe {
    width: 70%;
    margin: 0 auto;
    margin-top: 1rem;
}

.long-stripe {
    width: 100%;
    height: 3rem;
}

.img,
.stripe {
    animation: hintloading 2s ease-in-out 0s infinite reverse;
    -webkit-animation: hintloading 2s ease-in-out 0s infinite reverse;
}

@keyframes hintloading {
    0% {
        opacity: 0.5;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0.5;
    }
}

@-webkit-keyframes hintloading {
    0% {
        opacity: 0.5;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0.5;
    }
}
</style>