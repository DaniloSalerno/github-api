<script>
import { state } from '../state'

export default {
  name: 'AppCard',

  props: {
    element: Object
  },

  data() {
    return {
        state,
    }

  }
}
</script>

<template>
    <div class="col">

        <div class="card d-flex bg-dark text-white" :class="this.state.dataType === 'repositories' ? 'repo' : 'user' ">

            <img width="75":src=" this.state.dataType === 'repositories' ? element.owner.avatar_url : element.avatar_url" alt="profile image" class="image">
    
            <a :href="element.html_url"  target="_blank" class="name text-decoration-none">
                {{ this.state.dataType === 'repositories' ? element.name : element.login }}
            </a>

            <div class="description">
                {{ this.state.dataType === 'repositories' ? element.description  : ''}}
            </div>
    
            <div class="star text-warning">
                {{ this.state.dataType === 'repositories' ? element.stargazers_count + '★' : '' }} 
            </div>

        </div>
        
    </div>
</template>

<style lang="scss">

    .user {

        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        gap: 1rem;

        color: red;
    }

    .repo {
        height: 250px;

        flex-direction: column;

        .image {
            margin: 0 auto;
        }

        .name {
            text-align: center;
            margin-top: 0.5rem;
        }
    }

    .card {
        padding: 0.25rem;

        .description {
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 3; // Numero di righe da mostrare
            -webkit-box-orient: vertical; // Orientamento del contenuto
            text-overflow: ellipsis; //  Aggiunge un ellissi (...) quando il testo viene tagliato
            margin: 0.75rem 0;
        }

        .star {
            margin-top: auto;
        }

    }

</style>