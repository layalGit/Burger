import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	ingredients: [],
	orderNumber: null,
	isLoading: false,
};
const orderSlice = createSlice({
	name: 'orderIngredients',
	initialState,
	reducers: {
		setOrderNumber: (state, action) => {
			state.orderNumber = action.payload;
		},
		startLoading: (state) => {
			state.isLoading = true;
		},
		stopLoading: (state) => {
			state.isLoading = false;
		},
	},
});
export default orderSlice.reducer;
export const { setOrderNumber, startLoading, stopLoading } = orderSlice.actions;
