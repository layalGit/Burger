import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export type buns = {
	_id: string;
	image: string;
	name: string;
	price: number;
	type: string;
};
export type content = buns & { uniqueId: string };
type Counts = {
	[id: string]: number;
};
type ConstructorState = {
	buns: buns | null;
	contents: content[];
	totalPrice: number;
	counts: Counts;
};
const initialState: ConstructorState = {
	buns: null,
	contents: [],
	totalPrice: 0,
	counts: {},
};

const calculateTotalPrice = (state: ConstructorState) => {
	let totalPrice = 0;
	if (state.buns) totalPrice += state.buns.price * 2;

	const uniqueIds = new Set(state.contents.map((item) => item._id));
	for (const id of uniqueIds) {
		totalPrice +=
			state.contents.find((item) => item._id === id)!.price *
			(state.counts[id] || 0);
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
			prepare: (ingredient: content) => ({
				payload: { ...ingredient, uniqueId: uuidv4() },
				meta: undefined,
				error: false,
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
