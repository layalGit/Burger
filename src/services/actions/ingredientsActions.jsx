import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '@/config/configAPI.ts';
import { checkResponse } from '@utils/checkResponse.tsx';

export const fetchIngredients = createAsyncThunk(
	'ingredients/getAllIngredients',
	async () => {
		const response = await fetch(`${BASE_URL}/ingredients`);
		const data = checkResponse(response);
		return data;
	}
);
