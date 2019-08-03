import axios from 'axios';
import { APIkey } from '../food2ForkKey';

export default class Search {
	constructor(query) {
		this.query = query;
	}

	async getRecipes() {
		try {
			const result = await axios(`https://www.food2fork.com/api/search?key=${APIkey}&q=${this.query}`);
			this.recipes = result.data.recipes;
			// console.log(this.recipes);
		} catch (error) {
			console.log(error);
		}
	}

}
