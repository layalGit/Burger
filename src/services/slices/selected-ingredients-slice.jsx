import { createSlice } from '@reduxjs/toolkit';

const initialState = [];
const selectedIngredientsSlice = createSlice({
	name: 'selectedIngredients',
	initialState,
	reducers: {},
});
export default selectedIngredientsSlice.reducer;
