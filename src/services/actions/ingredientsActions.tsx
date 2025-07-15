import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '@/config/configAPI.ts';
import { checkResponse } from '@utils/checkResponse.tsx';
import { Ingredient } from '@components/burger-ingredients/burger-ingredients.tsx';

export const fetchIngredients = createAsyncThunk<Ingredient[], void>(
	'ingredients/getAllIngredients',
	async () => {
		const response = await fetch(`${BASE_URL}/ingredients`);
		const result = await checkResponse<Ingredient[]>(response);
		return result.data;
	}
);
