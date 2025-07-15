import { createSlice } from '@reduxjs/toolkit';
import { fetchIngredients } from '@/services/actions/ingredientsActions.jsx';
import { Ingredient } from '@components/burger-ingredients/burger-ingredients.tsx';

type IngredientsState = {
	allIngredients: Ingredient[];
	status: string | null;
	error: string | null;
};

const initialState: IngredientsState = {
	allIngredients: [],
	status: '',
	error: null,
};

const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchIngredients.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchIngredients.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.allIngredients = action.payload;
			})
			.addCase(fetchIngredients.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message || 'Неизвестная ошибка';
			});
	},
});

export default ingredientsSlice.reducer;
