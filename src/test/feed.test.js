import { describe, expect, it } from 'vitest';
import feedReducer, { initialState } from '../services/slices/feed-slice';
import { receiveFeedMessage } from '../services/actions/feedActions';

describe('feedSlice', () => {
	it('should handle receiveFeedMessage action', () => {
		const testPayload = {
			success: true,
			total: 100,
			totalToday: 10,
			orders: [
				{ id: 1, ingredients: ['ing1'], status: 'created', name: 'Order 1' },
				{ id: 2, ingredients: ['ing2'], status: 'pending', name: 'Order 2' },
			],
		};

		const action = receiveFeedMessage(testPayload);
		const newState = feedReducer(initialState, action);

		expect(newState).toEqual({
			orders: testPayload,
		});
	});
});
