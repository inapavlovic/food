import Search from './model/Search';
import Recipe from './model/Recipe';
import * as searchView from './view/searchView';
import { elements } from './view/share';

/** Global state of the app
* - Search
* - Current recipe
* - Shopping list
* - Liked recipes
*/
const state = {};

/**
 *  SEARCH CONTROLLER
 */
const searchController = async () => {
	const query = searchView.getSearchValue();
	if (query) {
		// Add to state new Search object
		state.search = new Search(query);
		// Search for recipes
		searchView.clearSearchFiled();
		searchView.clearRecipeList();
		try {
			await state.search.getRecipes();
			// console.log(state.search.recipes);
			// Render
			searchView.renderRecipeList(state.search.recipes);
		} catch (error) {
			console.log(error);
		}
	}
}

elements.searchForm.addEventListener('submit', event => { 
	event.preventDefault();
	searchController();
});

// Event Delegation
elements.pagination.addEventListener('click', event => {
	const button = event.target.closest('.page-button');
	if (button) {
		const goToPage = Number(button.dataset.goto);
		console.log(goToPage);
		searchView.clearRecipeList();
		searchView.renderRecipeList(state.search.recipes, goToPage);
	}
});

/**
 *  RECIPE CONTROLLER
 */


const recipeController = async () => {
	// Get id from URL
	const id = window.location.hash.replace('#', '');
	console.log(id);

	if (id) {
		// New recipe object
		state.recipe = new Recipe(id);
		try {
			// Get recipe data
			await state.recipe.getRecipe();
			console.log(state.recipe);
		} catch (error) {
			console.log(error);
		}

	}
};

// window.addEventListener('hashchange', recipeController);
['hashchange', 'load'].forEach( event => window.addEventListener(event, recipeController));

