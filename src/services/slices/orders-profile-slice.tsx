import { createSlice } from '@reduxjs/toolkit';
import { receiveOrdersMessage } from '../../services/actions/ordersProfileActions.ts';
import { OrdersResponse } from '@/utils/types.ts';

type ProfileOrdersState = {
	orders: OrdersResponse | null;
};

const initialState: ProfileOrdersState = {
	orders: null,
};

export const ordersProfileSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(receiveOrdersMessage, (state, action) => {
			if (action.payload.orders) {
				state.orders = action.payload;
			}
		});
	},
});
export default ordersProfileSlice.reducer;
