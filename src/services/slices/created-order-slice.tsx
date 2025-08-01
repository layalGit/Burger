import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '@/config/configAPI.ts';
import { fetchWithRefresh } from '@utils/fetchWithRefresh.tsx';
import { Order } from '@/utils/types';

type OrderSliceState = {
	orderNumber: number | null;
	isLoading: boolean;
	orderData: Order | null;
};

export const initialState: OrderSliceState = {
	orderNumber: null,
	isLoading: false,
	orderData: null,
};

export const getOrderByNumber = createAsyncThunk(
	'orderIngredients/getOrderByNumber',
	async (orderNumber: number) => {
		try {
			const response = await fetchWithRefresh(
				`${BASE_URL}/orders/${orderNumber}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json;charset=utf-8',
					},
				}
			);
			return response.orders[0];
		} catch (err) {
			if (err instanceof Error) {
				alert(err.message);
			} else {
				alert('err');
			}
		}
	}
);
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
	extraReducers: (builder) => {
		builder
			.addCase(getOrderByNumber.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getOrderByNumber.fulfilled, (state, action) => {
				state.isLoading = false;
				state.orderData = action.payload;
			})
			.addCase(getOrderByNumber.rejected, (state, action) => {
				state.isLoading = false;
				console.error('Ошибка при получении заказа:', action.payload);
			});
	},
});
export default orderSlice.reducer;
export const { setOrderNumber, startLoading, stopLoading } = orderSlice.actions;
