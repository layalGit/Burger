import { describe, it, expect } from 'vitest';
import ordersProfileReducer, {
	initialState,
} from '../services/slices/orders-profile-slice';
import { receiveOrdersMessage } from '../services/actions/ordersProfileActions';

describe('ordersProfileSlice', () => {
	it('should return initial state', () => {
		const state = ordersProfileReducer(undefined, { type: 'unknown' });
		expect(state).toEqual(initialState);
	});

	it('should handle receiveOrdersMessage with orders payload', () => {
		const mockOrders = {
			success: true,
			orders: [
				{ _id: 1, number: '123', status: 'created' },
				{ _id: 2, number: '456', status: 'pending' },
			],
			total: 100,
			totalToday: 2,
		};

		const action = {
			type: receiveOrdersMessage.type,
			payload: mockOrders,
		};

		const state = ordersProfileReducer(initialState, action);
		expect(state).toEqual({
			orders: mockOrders,
		});
	});

	it('should not update state when payload has no orders', () => {
		const invalidPayload = {
			success: false,
			message: 'Error occurred',
		};

		const action = {
			type: receiveOrdersMessage.type,
			payload: invalidPayload,
		};

		const state = ordersProfileReducer(initialState, action);
		expect(state).toEqual(initialState);
	});

	it('should handle empty payload', () => {
		const action = {
			type: receiveOrdersMessage.type,
			payload: {},
		};

		const state = ordersProfileReducer(initialState, action);
		expect(state).toEqual(initialState);
	});
});
