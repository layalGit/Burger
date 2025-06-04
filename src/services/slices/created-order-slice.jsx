import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	ingredients: [],
	orderNumber: null,
};
const orderSlice = createSlice({
	name: 'orderIngredients',
	initialState,
	reducers: {
		setOrderNumber: (state, action) => {
			state.orderNumber = action.payload;
		},
	},
});
export default orderSlice.reducer;
export const { setOrderNumber } = orderSlice.actions;
