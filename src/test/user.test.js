import { describe, it, expect } from 'vitest';
import userReducer, {
	setUser,
	setIsAuthChecked,
	initialState,
} from '../services/slices/user-slice';
import {
	login,
	logout,
	register,
} from '../services/actions/authorizationActions';

describe('userSlice', () => {
	it('should return initial state', () => {
		const state = userReducer(undefined, { type: 'unknown' });
		expect(state).toEqual(initialState);
	});

	it('should handle setUser', () => {
		const userData = { email: 'test@example.com', name: 'Test User' };
		const state = userReducer(initialState, setUser(userData));
		expect(state.user).toEqual(userData);
		expect(state.isAuthChecked).toBe(false);
	});

	it('should handle setIsAuthChecked', () => {
		const state = userReducer(initialState, setIsAuthChecked(true));
		expect(state.isAuthChecked).toBe(true);
		expect(state.user).toBeNull(); // Не меняет user
	});

	it('should handle login.fulfilled', () => {
		const userData = { email: 'login@example.com', name: 'Logged In User' };
		const action = {
			type: login.fulfilled.type,
			payload: userData,
		};

		const state = userReducer(initialState, action);
		expect(state.user).toEqual(userData);
	});

	it('should handle register.fulfilled', () => {
		const userData = { email: 'register@example.com', name: 'Registered User' };
		const action = {
			type: register.fulfilled.type,
			payload: userData,
		};

		const state = userReducer(initialState, action);
		expect(state.user).toEqual(userData);
	});

	it('should handle logout.fulfilled', () => {
		const loggedInState = {
			user: { email: 'user@example.com', name: 'Active User' },
			isAuthChecked: true,
		};

		const action = { type: logout.fulfilled.type };
		const state = userReducer(loggedInState, action);

		expect(state.user).toBeNull();
		expect(state.isAuthChecked).toBe(true);
	});

	it('should handle multiple actions together', () => {
		let state = userReducer(initialState, setIsAuthChecked(true));
		state = userReducer(state, setUser({ email: 'multi@test.com' }));

		expect(state).toEqual({
			user: { email: 'multi@test.com' },
			isAuthChecked: true,
		});

		// Логаут
		state = userReducer(state, { type: logout.fulfilled.type });
		expect(state.user).toBeNull();
		expect(state.isAuthChecked).toBe(true);
	});

	it('should handle partial user data', () => {
		const userData = { email: 'partial@example.com' };
		const action = {
			type: login.fulfilled.type,
			payload: userData,
		};

		const state = userReducer(initialState, action);
		expect(state.user).toEqual(userData);
	});
});
