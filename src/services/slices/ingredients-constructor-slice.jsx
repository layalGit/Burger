import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
	buns: null,
	contents: [],
	totalPrice: 0,
};

const calculateTotalPrice = (state) => {
	let price = 0;
	if (state.buns) {
		price += state.buns.price * 2;
	}
	state.contents.forEach((content) => {
		price += content.price;
	});
	return price;
};

const ingredientsConstructorSlice = createSlice({
	name: 'ingredientsConstructor',
	initialState,
	reducers: {
		addBun: (state, action) => {
			state.buns = action.payload;
			state.totalPrice = calculateTotalPrice(state);
		},
		removeBun: (state) => {
			state.buns = null;
			state.totalPrice = calculateTotalPrice(state);
		},
		addContent: (state, action) => {
			const newItem = { ...action.payload, id: uuidv4() };
			state.contents.push(newItem);
			state.totalPrice = calculateTotalPrice(state);
		},
		removeContent: (state, action) => {
			state.contents = state.contents.filter(
				(content) => content.id !== action.payload.id
			);
			state.totalPrice = calculateTotalPrice(state);
		},
	},
});

export const { addBun, removeBun, addContent, removeContent, moveContent } =
	ingredientsConstructorSlice.actions;

export default ingredientsConstructorSlice.reducer;
