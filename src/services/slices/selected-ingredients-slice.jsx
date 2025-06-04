import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	image_large: 'Картинка не загрузилась',
	name: 'Булка',
	calories: 0,
	proteins: 0,
	fat: 0,
	carbohydrates: 0,
};
const selectedIngredientsSlice = createSlice({
	name: 'selectedIngredients',
	initialState,
	reducers: {
		selectIngredients: (state, action) => {
			state.image_large = action.payload.image_large ?? '';
			state.name = action.payload.name ?? '';
			state.calories = action.payload.calories ?? 0;
			state.proteins = action.payload.proteins ?? 0;
			state.fat = action.payload.fat ?? 0;
			state.carbohydrates = action.payload.carbohydrates ?? 0;
		},
	},
});
export default selectedIngredientsSlice.reducer;
export const { selectIngredients } = selectedIngredientsSlice.actions;
