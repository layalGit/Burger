import * as api from '@utils/api.js';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setIsAuthChecked, setUser } from '@/services/slices/user-slice.jsx';

export const login = createAsyncThunk('user/login', async (data) => {
	const res = await api.login(data);
	return res.user;
});
export const register = createAsyncThunk('user/register', async (data) => {
	const res = await api.register(data);
	return res.user;
});
export const forgotPassword = createAsyncThunk(
	'user/forgotPassword',
	async (data) => {
		const res = await api.forgotPassword(data);
		return res.user;
	}
);
export const resetPassword = createAsyncThunk(
	'user/resetPassword',
	async (data) => {
		const res = await api.resetPassword(data);
		return res.user;
	}
);
export const logout = createAsyncThunk('user/logout', async () => {
	await api.logout();
});
export const checkUserAuth = createAsyncThunk(
	'user/checkUserAuth',
	async (_, { dispatch }) => {
		if (localStorage.getItem('accessToken')) {
			api
				.getUser()
				.then((res) => dispatch(setUser(res)))
				.finally(() => dispatch(setIsAuthChecked(true)));
		} else {
			dispatch(setIsAuthChecked(true));
		}
	}
);
