import axios from 'axios';

export default class Search {
	constructor(query) {
		this.query = query;
	}

	async getResults() {
		const APIkey = 'API_KEY';
		try {
			const result = await axios(`https://www.food2fork.com/api/search?key=${APIkey}&q=${this.query}`);
			this.recipes = result.data.recipes;
			// console.log(this.recipes);
		} catch (error) {
			console.log(error);
		}
	}

}
