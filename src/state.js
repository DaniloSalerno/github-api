import { reactive } from 'vue'
import axios from 'axios'

export const state = reactive({

    type: 'repositories',

    searched: '',

    data: [],

    fetchData() {

        axios.get(`https://api.github.com/search/${this.type}?q=${this.searched}`)
            .then(response => {
                console.log(response.data.items);
                this.data = response.data.items
            })
            .catch(err => {
                console.error(err);
            })
    }

})





