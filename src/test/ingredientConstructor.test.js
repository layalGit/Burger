import { describe, expect, it } from 'vitest';
import reducer, {
	addBun,
	addContent,
	removeContent,
} from '../services/slices/ingredients-constructor-slice';

describe('ingredientsConstructorSlice', () => {
	const initialState = {
		buns: null,
		contents: [],
		totalPrice: 0,
		counts: {},
	};

	it('should handle bun and ingredients correctly', () => {
		const bun = {
			_id: 'bun1',
			image: 'bun.jpg',
			name: 'Test Bun',
			price: 100,
			type: 'bun',
		};

		const ingredient = {
			_id: 'ing1',
			image: 'ing.jpg',
			name: 'Test Ingredient',
			price: 50,
			type: 'sauce',
		};

		let state = reducer(initialState, addBun(bun));

		expect(state.buns).toEqual(bun);
		expect(state.counts[bun._id]).toBe(2);
		expect(state.totalPrice).toBe(200);

		state = reducer(state, addContent(ingredient));

		expect(state.contents.length).toBe(1);
		expect(state.contents[0]).toMatchObject(ingredient);
		expect(state.counts[ingredient._id]).toBe(1);
		expect(state.totalPrice).toBe(250);

		// Добавляем второй ингредиент
		state = reducer(state, addContent(ingredient));

		expect(state.contents.length).toBe(2);
		expect(state.counts[ingredient._id]).toBe(2);
		expect(state.totalPrice).toBe(300);

		// Удаляем первый ингредиент
		const firstIngredientId = state.contents[0].uniqueId;
		state = reducer(state, removeContent({ uniqueId: firstIngredientId }));

		expect(state.contents.length).toBe(1);
		expect(state.counts[ingredient._id]).toBe(1);
		expect(state.totalPrice).toBe(250);
	});
});
