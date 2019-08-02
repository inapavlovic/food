import { elements } from './share';


export const getSearchValue = () => elements.searchField.value;

export const clearSearchFiled = () => {
	elements.searchField.value = '';
};

export const clearRecipeList = () => {
	elements.recipeList.innerHTML = '';
};

const characterLimit = (sentence, limit = 21) => {
	const newSentence = [];
	if (sentence.length > limit) {
		sentence.split('').reduce((accumulator, current) => {
			if (accumulator + current.length <= limit) {
				newSentence.push(current);
			}
			return accumulator + current.length;
		}, 0);
		return `${newSentence.join('')}...`;
	}
	return sentence;
};

const renderRecipe = recipe => {
	const markup = `
		<li>
			<a href="#${recipe.recipe_id}">
  			<figure>
  				<figcaption>${characterLimit(recipe.title)}</figcaption>
	  			<img src="${recipe.image_url}">
	  		</figure>
			</a>
		</li>
	`;
	elements.recipeList.insertAdjacentHTML('beforeend', markup);
}

export const renderRecipeList = recipes => {
	recipes.forEach(renderRecipe);
}