import { describe, expect, it } from 'vitest';
import orderReducer, {
	setOrderNumber,
	startLoading,
	stopLoading,
	getOrderByNumber,
} from '../services/slices/created-order-slice';

describe('orderSlice', () => {
	const initialState = {
		orderNumber: null,
		isLoading: false,
		orderData: null,
	};

	const mockOrder = {
		_id: '1',
		name: 'Test Order',
		number: 12345,
		status: 'created',
		createdAt: '2023-01-01',
		updatedAt: '2023-01-01',
		ingredients: ['ing1', 'ing2'],
	};

	it('should handle initial state', () => {
		expect(orderReducer(undefined, { type: 'unknown' })).toEqual(initialState);
	});

	it('should handle setOrderNumber', () => {
		const state = orderReducer(initialState, setOrderNumber(1001));
		expect(state.orderNumber).toEqual(1001);
	});

	it('should handle startLoading and stopLoading', () => {
		let state = orderReducer(initialState, startLoading());
		expect(state.isLoading).toBe(true);

		state = orderReducer(state, stopLoading());
		expect(state.isLoading).toBe(false);
	});

	it('should handle getOrderByNumber.pending', () => {
		const action = { type: getOrderByNumber.pending.type };
		const state = orderReducer(initialState, action);
		expect(state.isLoading).toBe(true);
	});

	it('should handle getOrderByNumber.fulfilled', () => {
		const action = {
			type: getOrderByNumber.fulfilled.type,
			payload: mockOrder,
		};
		const state = orderReducer(initialState, action);

		expect(state.isLoading).toBe(false);
		expect(state.orderData).toEqual(mockOrder);
	});

	it('should handle getOrderByNumber.rejected', () => {
		const action = {
			type: getOrderByNumber.rejected.type,
			payload: 'Error message',
		};
		const state = orderReducer({ ...initialState, isLoading: true }, action);

		expect(state.isLoading).toBe(false);
	});
});
