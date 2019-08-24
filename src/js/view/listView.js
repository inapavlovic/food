import { elements } from './elements';

export const renderItem = item => {
	const markup = `
    <li class="shopping-item" data-id=${item.id}>
    	<p>
		    <input class="count-value" type="number" value="${item.count}" step="${item.count}" min="0">
		    <span>${item.unit}</span> ${item.ingredient}
		    <button class="shopping-item-delete">x</button>
      </p>
    </li>
	`;
	elements.shoppingList.insertAdjacentHTML('beforeend', markup);
};

export const deleteItem = id => {
	const item = document.querySelector(`[data-id="${id}"]`);
	if (item) item.parentElement.removeChild(item);
};