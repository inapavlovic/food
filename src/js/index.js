import Search from './model/Search';
import * as searchView from './view/searchView';
import { elements } from './view/share';

/** Global state of the app
* - Search
* - Current recipe
* - Shopping list
* - Liked recipes
*/
const state = {};


const controlSearch = async () => {
	const query = searchView.getSearchValue();
	if (query) {
		// Add to state new Search object
		state.search = new Search(query);
		// Search for recipes
		searchView.clearSearchFiled();
		searchView.clearRecipeList();
		await state.search.getResults();
		console.log(state.search.recipes);
		// Render
		searchView.renderRecipeList(state.search.recipes);
	}
}

elements.searchForm.addEventListener('submit', event => { 
	event.preventDefault();
	controlSearch();
});

// const search = new Search('pizza');
