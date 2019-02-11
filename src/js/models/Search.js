import axios from 'axios'
import { key, proxy } from '../config'

export default class Search {
    constructor(query) {
        this.query = query
        this.result
    }

    async getResults() {

        try {
            const req = `${proxy}https://www.food2fork.com/api/search?key=${key}&q${this.query}`
            const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q${this.query}`)
            console.log('Search#getResults:', res)
            this.result = res.data.recipes
        } catch (err) {
            console.log("Something has gone wrong while searching", err)
            alert(err)
        }
    }
}
