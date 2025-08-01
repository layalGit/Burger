import { describe, it, expect } from 'vitest';
import ingredientsReducer, {
	initialState,
} from '../services/slices/ingredients-slice';
import { fetchIngredients } from '@/services/actions/ingredientsActions';

describe('ingredientsSlice', () => {
	it('should handle initial state', () => {
		expect(ingredientsReducer(undefined, { type: 'unknown' })).toEqual({
			allIngredients: [],
			status: '',
			error: null,
		});
	});

	it('should handle fetchIngredients.pending', () => {
		const action = {
			type: fetchIngredients.pending.type,
		};
		const state = ingredientsReducer(initialState, action);
		expect(state).toEqual({
			allIngredients: [],
			status: 'loading',
			error: null,
		});
	});

	it('should handle fetchIngredients.fulfilled', () => {
		const mockIngredients = [
			{ _id: '1', name: 'Bun' },
			{ _id: '2', name: 'Cheese' },
		];

		const action = {
			type: fetchIngredients.fulfilled.type,
			payload: mockIngredients,
		};

		const state = ingredientsReducer(initialState, action);
		expect(state).toEqual({
			allIngredients: mockIngredients,
			status: 'succeeded',
			error: null,
		});
	});

	it('should handle fetchIngredients.rejected', () => {
		const errorMessage = 'Network error';
		const action = {
			type: fetchIngredients.rejected.type,
			error: { message: errorMessage },
		};

		const state = ingredientsReducer(initialState, action);
		expect(state).toEqual({
			allIngredients: [],
			status: 'failed',
			error: errorMessage,
		});
	});
});
