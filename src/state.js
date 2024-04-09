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

    // oggetto che conterrà i link per fare le chiamate api alle altre pagine
    urls: {},

    // pagina corrente della paginazione
    currentPage: 1,

    // Messaggio da 
    queryMessage: '',

    fetchData(url) {

        // controllo se nell'url che viene passato a fetchData è indicata la pagina, uso questo numero come current page
        if (!isNaN(url.split('page=')[1])) {

            this.currentPage = url.split('page=')[1]

        } else {
            this.currentPage = 1
        }

        // Controllo che nell'input ci siano almeno 3 caratteri eliminando gli spazi
        if (this.searched.replace(/\s+/g, '').length > 2) {

            // visualizziamo il loader
            this.loader = true

            axios.get(url)
                .then(response => {

                    // Controllo se in header è presente la proprietà link
                    if (response.headers.hasOwnProperty('link')) {

                        // Nell'header sono presenti i link per next,prev e last, li divido in un array
                        const links = response.headers.link.split(',');

                        //Esempio: <https://api.github.com/search/repositories?q=aaa&page=2>; rel="next", <https://api.github.com/search/repositories?q=aaa&page=34>; rel="last"

                        links.forEach(link => {

                            const [url, rel] = link.split(';'); // Divido il link e il relativo attributo e li assegno a 2 variabili

                            const urlValue = url.trim().slice(1, -1); // Rimuovo gli spazi e i caratteri < >

                            const relValue = rel.trim().split('=')[1].slice(1, -1); // Rimuovo gli spazi e le virgolette da rel

                            if (relValue === 'prev' || relValue === 'next' || relValue === 'last') {
                                this.urls[relValue] = urlValue; // Salvo l'url nel relativo attributo dell'oggetto urls
                            }

                        });
                    }


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

                        // Messaggio da visualizzare in pagina
                        this.queryMessage = 'Results for ' + this.searched

                        // Se c'è la proprietà name significa che abbiamo cercato per repositories
                        if (response.data.items[0].hasOwnProperty('name')) {
                            this.dataType = 'repositories'
                            // Altrimenti abbiamo cercato per users
                        } else if (response.data.items[0].hasOwnProperty('login')) {
                            this.dataType = 'users'
                        }// In modo da variare la visualizzazione delle card


                        // Se non abbiamo risultati
                    } else {
                        this.dataEmpty = true

                        // togliamo il loader
                        this.loader = false

                        // Messaggio da visualizzare in pagina
                        this.queryMessage = 'No results found for \'' + this.searched + '\''
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





