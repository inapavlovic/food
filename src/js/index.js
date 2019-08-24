import Search from './model/Search';
import Recipe from './model/Recipe';
import List from './model/List';
import * as searchView from './view/searchView';
import * as recipeView from './view/recipeView';
import * as listView from './view/listView';
import { elements } from './view/elements';

/** Global state of the app
* - Search
* - Current recipe
* - Shopping list
* - Liked recipes
*/
const state = {};
// window.state = state;

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
		const goToPage = ParseInt(button.dataset.goto, 10);
		// console.log(goToPage);
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
		recipeView.clearRecipe();
		if (state.search) searchView.select(id);
		// New recipe object
		state.recipe = new Recipe(id);
		try {
			// Get recipe data
			await state.recipe.getRecipe();
			// console.log(state.recipe);
			// Transform data
			state.recipe.transformIngredients();
			console.log(state.recipe);
			// Render recipe
			recipeView.renderRecipe(state.recipe);
		} catch (error) {
			console.log(error);
		}

	}
};

// window.addEventListener('hashchange', recipeController);
['hashchange', 'load'].forEach( event => window.addEventListener(event, recipeController));

/**
 *  LIST CONTROLLER
 */
const controlList = () => {
	// Create a new List
	if (!state.list) state.list = new List();
	// Add ingredients to the list
	state.recipe.ingredients.forEach( element => {
		const item = state.list.addItem(element.count, element.unit, element.ingredient);
		listView.renderItem(item);
	});
}

// Event Delegation
elements.shoppingList.addEventListener('click', element => {
	const id = element.target.closest('.shopping-item').dataset.id;
	if (element.target.matches('.shopping-item-delete')) {
		// delete from the state
		state.list.deleteItem(id);
		// delete from the ui
		listView.deleteItem(id);
	} else if (element.target.matches('.count-value')) {
		const value = parseFloat(element.target.value, 10);
		// update the state
		state.list.updateCount(id, value);
	}
});

// Event Delegation
// Handle recipe button click
elements.recipe.addEventListener('click', event => {
	if (event.target.matches('.add-to-shopping-list')) {
		controlList();
	}
});




