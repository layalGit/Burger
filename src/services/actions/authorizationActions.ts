import * as api from '@utils/api.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setIsAuthChecked, setUser } from '../slices/user-slice.tsx';
import {
	ForgotPasswordRequestData,
	LoginRequestData,
	RegisterRequestData,
	ResetPasswordRequestData,
} from '@utils/api.ts';

export const login = createAsyncThunk(
	'user/login',
	async (data: LoginRequestData) => {
		const res = await api.login(data);
		return res.user;
	}
);
export const register = createAsyncThunk(
	'user/register',
	async (data: RegisterRequestData) => {
		const res = await api.register(data);
		return res.user;
	}
);
export const forgotPassword = createAsyncThunk(
	'user/forgotPassword',
	async (data: ForgotPasswordRequestData) => {
		const res = await api.forgotPassword(data);
		return res.success;
	}
);
export const resetPassword = createAsyncThunk(
	'user/resetPassword',
	async (data: ResetPasswordRequestData) => {
		const res = await api.resetPassword(data);
		return res.success;
	}
);
export const logout = createAsyncThunk('user/logout', async () => {
	await api.logout();
});
export const checkUserAuth = createAsyncThunk(
	'user/checkUserAuth',
	async (_, { dispatch }) => {
		try {
			const token = localStorage.getItem('accessToken');
			if (token) {
				const res = await api.getUser();
				dispatch(setUser(res.user));
			}
		} catch (error) {
			console.error('Ошибка проверки авторизации:', error);
		} finally {
			dispatch(setIsAuthChecked(true));
		}
	}
);
