import { createSlice } from '@reduxjs/toolkit';
import { receiveFeedMessage } from '../../services/actions/feedActions.ts';
import { OrdersResponse } from '@/utils/types.ts';

type FeedState = {
	orders: OrdersResponse | null;
};
const initialState: FeedState = {
	orders: null,
};

export const feedSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(receiveFeedMessage, (state, action) => {
			if (action.payload.orders) {
				state.orders = action.payload;
			}
		});
	},
});
export default feedSlice.reducer;
