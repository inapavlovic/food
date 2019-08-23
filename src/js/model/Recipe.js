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
			this.image = result.data.recipe.image_url;
			console.log(result);
		} catch (error) {
			console.log(error);
		}
	}

	transformIngredients() {
		const unitsToReplace = ['ounces', 'ounce', 'cups', 'cup', 'teaspoons', 'teaspoon'];
		const units = ['oz', 'oz', 'cup', 'cup', 'tsp', 'tsp'];
		const newIngredients = this.ingredients.map( element => {
			let ingredient = element.toLowerCase();
			unitsToReplace.forEach((unit, index) => {
				ingredient = ingredient.replace(unit, units[index]);
			});
			// Transform ingredients into count, unit and ingredient
			const splitSentence = ingredient.split(' ');
			const unitIndex = splitSentence.findIndex(el => units.includes(el));

			let transformIngredient;
			if (unitIndex > -1) {
				// there is a unit
				// 4 1/2 or 4
				const countNumbers = splitSentence.slice(0, unitIndex);

				let count;
				if (countNumbers.length === 1) {
					count = eval(splitSentence[0]);
				} else {
					// 4+1/2 evaluates 4.5
					count = eval(splitSentence.slice(0, unitIndex).join('+'));
				}

				transformIngredient = {
					count,
					unit: splitSentence[unitIndex],
					ingredient: splitSentence.slice(unitIndex + 1).join(' ')
				};

			} else if (parseInt(splitSentence[0], 10)) {
				// there is no unit, but 1st element is a number
				transformIngredient = {
					count: parseInt(splitSentence[0], 10),
					unit: '',
					ingredient: splitSentence.slice(1).join(' ')
				};
			} else if (unitIndex === -1) {
				// there is no unit and NaN in the 1st position
				transformIngredient = {
					count: 1,
					unit: '',
					ingredient
				};
			}

			return transformIngredient;
		});
		this.ingredients = newIngredients;
	}
}