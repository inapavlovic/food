import { elements } from './share';


export const getSearchValue = () => elements.searchField.value;

export const clearSearchFiled = () => {
	elements.searchField.value = '';
};

export const clearRecipeList = () => {
	elements.recipeList.innerHTML = '';
	elements.pagination.innerHTML = '';
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
};

const createButton = (page, type) => `
	<button class="page-button" data-goto=${type === 'previous' ? page - 1 : page + 1}>
		${type === 'previous' ? 'Previous' : 'Next'}
	</button>
`;

const renderButtons = (currentPage, numberOfRecipes, recipesPerPage) => {
	const pages = Math.ceil(numberOfRecipes / recipesPerPage);

	let button;
	if (currentPage === 1 && pages > 1) {
		button = createButton(currentPage, 'next');
	} else if (currentPage < pages) {
		button = `${createButton(currentPage, 'previous')}${createButton(currentPage, 'next')}`;
	} else if (currentPage === pages && pages > 1) {
		button = createButton(currentPage, 'previous');
	}

	elements.pagination.insertAdjacentHTML('afterbegin', button);

}

export const renderRecipeList = (recipes, currentPage = 1, recipesPerPage = 3) => {
	const start = (currentPage - 1) * recipesPerPage;
	const end = currentPage * recipesPerPage;

	recipes.slice(start, end).forEach(renderRecipe);

	renderButtons(currentPage, recipes.length, recipesPerPage);
};

