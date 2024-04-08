import { reactive } from 'vue'
import axios from 'axios'

export const state = reactive({

    type: 'repositories',

    searched: '',

    data: [],

    dataType: '',

    fetchData() {

        axios.get(`https://api.github.com/search/${this.type}?q=${this.searched}`)
            .then(response => {
                console.log(response.data.items[0].name);
                this.data = response.data.items

                if (response.data.items[0].name) {
                    this.dataType = 'repositories'
                } else {
                    this.dataType = 'users'
                }
            })
            .catch(err => {
                console.error(err);
            })
    }

})





