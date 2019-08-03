import axios from 'axios';
import { APIkey } from '../food2ForkKey';

export default class Recipe {
	constructor(id) {
		this.id = id;
	}

	async getRecipe() {
		try {
			const result = await axios(`https://www.food2fork.com/api/get?key=${APIkey}&rId=${this.id}`);
			this.title = result.data.recipe.title;
			this.ingredients = result.data.recipe.ingredients;
		} catch (error) {
			console.log(error);
		}
	}
}