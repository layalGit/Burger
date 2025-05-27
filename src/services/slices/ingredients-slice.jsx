import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const UrlApi = 'https://norma.nomoreparties.space/api/ingredients';

export const fetchIngredients = createAsyncThunk(
	'ingredients/getAllIngredients',
	async () => {
		const response = await fetch(UrlApi);
		if (!response.ok) {
			throw new Error(`Ошибка сервера: ${response.status}`);
		}
		return await response.json();
	}
);

const initialState = {
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
				state.allIngredients = action.payload.data;
			})
			.addCase(fetchIngredients.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message || 'Неизвестная ошибка';
			});
	},
});

export default ingredientsSlice.reducer;
