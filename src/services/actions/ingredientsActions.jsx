import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '@/config/configAPI.jsx';
import { checkResponse } from '@utils/checkResponse.jsx';

export const fetchIngredients = createAsyncThunk(
	'ingredients/getAllIngredients',
	async () => {
		const response = await fetch(`${BASE_URL}/ingredients`);
		const data = checkResponse(response);
		return data;
	}
);
