import { elements } from './elements';


const createIngredient = item => `
	<li>
		${item.count}<span>${item.unit}</span>
		${item.ingredient}
	</li>
`;

export const clearRecipe = () => {
	elements.recipe.innerHTML = '';
};

export const renderRecipe = recipe => {
	const markup = `
		<figure>
			<figcaption>${recipe.title}</figcaption>
			<img src="${recipe.image}">
		</figure>
		<ul>
			${recipe.ingredients.map(element => createIngredient(element)).join('')}
		</ul>
	`;
	elements.recipe.insertAdjacentHTML('afterbegin', markup);
};