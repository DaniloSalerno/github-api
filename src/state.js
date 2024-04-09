import { reactive } from 'vue'
import axios from 'axios'

export const state = reactive({

    // v-model sul select
    type: 'repositories',

    //v-model sull'input di tipo text
    searched: '',

    // array con i dati trovati
    data: [],

    // tipo di dato cercato, repositories o users per cambiare la visualizzazione delle card
    dataType: '',

    // booleano per capire se abbiamo risultati dalla ricerca
    dataEmpty: false,

    // booleano per capire se l'input è valido
    invalidInput: false,

    // booleano per visualizzare un loader
    loader: false,

    fetchData() {

        // Controllo che nell'input ci siano almeno 3 caratteri eliminando gli spazi
        if (this.searched.length > 2 && this.searched.replace(/\s+/g, '').trim().length > 2) {

            // visualizziamo il loader
            this.loader = true

            axios.get(`https://api.github.com/search/${this.type}?q=${this.searched}`)
                .then(response => {

                    console.log(response.data.items);
                    console.log(this.searched.length > 2);
                    console.log(this.searched.replace(/\s+/g, '').trim().length > 2);

                    // Se ci sono risultati
                    if (response.data.items.length > 0) {

                        // data è un array con un massimo di 30 oggetti
                        this.data = response.data.items

                        // se ci sono elementi in data setto dataEmpty su false
                        this.dataEmpty = false

                        // togliamo il loader
                        this.loader = false

                        // L'input è valido
                        this.invalidInput = false

                        // Se c'è la proprietà name significa che abbiamo cercato per repositories
                        if (response.data.items[0].hasOwnProperty('name')) {
                            this.dataType = 'repositories'
                            // Altrimenti abbiamo cercato per users
                        } else if (response.data.items[0].hasOwnProperty('login')) {
                            this.dataType = 'users'
                        }
                        // In modo da variare la visualizzazione delle card

                        // Se non abbiamo risultati
                    } else {
                        this.dataEmpty = true
                        console.log('nessun elemento trovato');
                    }
                })
                .catch(err => {
                    console.error(err);
                })
        } else {
            // Se abbiamo meno di 3 caratteri
            this.invalidInput = true
        }

    }

})





