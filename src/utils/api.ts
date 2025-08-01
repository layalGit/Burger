import { BASE_URL } from '@/config/configAPI.ts';
import { fetchWithRefresh } from '@utils/fetchWithRefresh.tsx';

type UserResponse = {
	success: boolean;
	message?: string;
	refreshToken: string;
	accessToken: string;
	user: {
		email: string;
		name: string;
	};
};

type RegisterRequestData = {
	name: string;
	password: string;
	email: string;
};

type LoginRequestData = {
	email: string;
	password: string;
};

type ForgotPasswordRequestData = {
	email: string;
};

type ResetPasswordRequestData = {
	token: string;
	password: string;
};
type ErrorResponse = {
	success: false;
	code: number;
	message: string;
};
export const checkReponse = (
	res: Response
): Promise<UserResponse | ErrorResponse> =>
	res.ok
		? res.json()
		: res.json().then((err: ErrorResponse) => Promise.reject(err));

const getUser = async (): Promise<UserResponse> => {
	try {
		const accessToken = localStorage.getItem('accessToken');

		const headers: HeadersInit = {
			'Content-Type': 'application/json;charset=utf-8',
		};

		if (accessToken) {
			headers.Authorization = `${accessToken}`;
		}

		const response = await fetchWithRefresh(`${BASE_URL}/auth/user`, {
			method: 'GET',
			headers,
		});

		return response;
	} catch (error) {
		localStorage.removeItem('refreshToken');
		localStorage.removeItem('accessToken');
		throw error;
	}
};

const register = async (
	requestData: RegisterRequestData
): Promise<UserResponse> => {
	try {
		const response = await fetch(`${BASE_URL}/auth/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify(requestData),
		});

		const data = await checkReponse(response);

		if (data.success) {
			localStorage.setItem('refreshToken', data.refreshToken);
			localStorage.setItem('accessToken', data.accessToken);
			return data;
		} else {
			throw new Error(data.message || 'Ошибка при регистрации');
		}
	} catch (error) {
		console.error('Ошибка при регистрации:', error);
		throw error;
	}
};

const login = async (requestData: LoginRequestData): Promise<UserResponse> => {
	try {
		const response = await fetch(`${BASE_URL}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify(requestData),
		});
		const data = await checkReponse(response);
		if (data.success) {
			localStorage.setItem('refreshToken', data.refreshToken);
			localStorage.setItem('accessToken', data.accessToken);
			return data;
		} else {
			throw new Error('Ошибка при входе в систему');
		}
	} catch (error) {
		console.error('Ошибка при входе в систему:', error);
		throw error;
	}
};

const forgotPassword = async (
	requestData: ForgotPasswordRequestData
): Promise<{ success: boolean }> => {
	try {
		const response = await fetch(`${BASE_URL}/password-reset`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify(requestData),
		});
		const data = await checkReponse(response);
		if (data.success) {
			return { success: true };
		} else {
			throw new Error('Ошибка при восстановлении пароля');
		}
	} catch (error) {
		console.error('Ошибка при восстановлении пароля:', error);
		throw error;
	}
};

const resetPassword = async (
	requestData: ResetPasswordRequestData
): Promise<{ success: boolean }> => {
	try {
		const response = await fetch(`${BASE_URL}/password-reset/reset`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify(requestData),
		});
		const data = await checkReponse(response);
		if (data.success) {
			return { success: true };
		} else {
			throw new Error('Ошибка при сбросе пароля');
		}
	} catch (error) {
		console.error('Ошибка при сбросе пароля:', error);
		throw error;
	}
};

const logout = async (): Promise<UserResponse> => {
	try {
		const response = await fetch(`${BASE_URL}/auth/logout`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({
				token: localStorage.getItem('refreshToken'),
			}),
		});
		const data = await checkReponse(response);
		if (data.success) {
			localStorage.removeItem('refreshToken');
			localStorage.removeItem('accessToken');
			return data;
		} else {
			throw new Error('');
		}
	} catch (error) {
		console.error('', error);
		throw error;
	}
};
export type {
	UserResponse,
	RegisterRequestData,
	LoginRequestData,
	ForgotPasswordRequestData,
	ResetPasswordRequestData,
};

export { getUser, login, logout, register, forgotPassword, resetPassword };
