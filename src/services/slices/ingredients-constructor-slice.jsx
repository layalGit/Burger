import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
	buns: null,
	contents: [],
	totalPrice: 0,
	counts: {},
};

const calculateTotalPrice = (state) => {
	let totalPrice = 0;
	if (state.buns) {
		totalPrice += state.buns.price * state.counts[state.buns._id];
	}
	for (let ingredient of state.contents) {
		totalPrice += ingredient.price * state.counts[ingredient._id];
	}
	return totalPrice;
};

const ingredientsConstructorSlice = createSlice({
	name: 'ingredientsConstructor',
	initialState,
	reducers: {
		addBun: (state, action) => {
			const newBun = action.payload;

			if (state.buns && state.buns._id !== newBun._id) {
				delete state.counts[state.buns._id];
			}

			state.buns = newBun;
			state.counts[newBun._id] = 2;

			state.totalPrice = calculateTotalPrice(state);
		},

		addContent: {
			reducer: (state, action) => {
				const addedIngredient = action.payload;

				state.counts[addedIngredient._id] =
					(state.counts[addedIngredient._id] || 0) + 1;
				state.contents.push(addedIngredient);
				state.totalPrice = calculateTotalPrice(state);
			},
			prepare: (ingredient) => ({
				payload: { ...ingredient, uniqueId: uuidv4() },
			}),
		},

		removeContent: (state, action) => {
			const removedUniqueId = action.payload.uniqueId;
			const indexToRemove = state.contents.findIndex(
				(item) => item.uniqueId === removedUniqueId
			);

			if (indexToRemove >= 0) {
				const removedItem = state.contents[indexToRemove];

				state.contents.splice(indexToRemove, 1);

				if (state.counts[removedItem._id]) {
					state.counts[removedItem._id] -= 1;

					if (state.counts[removedItem._id] <= 0) {
						delete state.counts[removedItem._id];
					}
				}

				state.totalPrice = calculateTotalPrice(state);
			}
		},
		updateIngredientsOrder: (state, action) => {
			const { dragIndex, hoverIndex } = action.payload;
			const newContents = [...state.contents];
			const [movedItem] = newContents.splice(dragIndex, 1);
			newContents.splice(hoverIndex, 0, movedItem);
			state.contents = newContents;
		},
	},
});

export const { addBun, updateIngredientsOrder, addContent, removeContent } =
	ingredientsConstructorSlice.actions;

export default ingredientsConstructorSlice.reducer;
