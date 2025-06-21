import { fetchWithRefresh } from '@utils/fetchWithRefresh.js';
import { BASE_URL } from '@/config/configAPI.jsx';

const checkReponse = (res) => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const getUser = async () => {
	try {
		const response = await fetchWithRefresh(`${BASE_URL}/auth/user`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				authorization: localStorage.getItem('accessToken'),
			},
		});
		return response;
	} catch (error) {
		localStorage.removeItem('refreshToken');
		localStorage.removeItem('accessToken');
		throw error;
	}
};
const register = async (requestData) => {
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
const login = async (requestData) => {
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

const logout = async () => {
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
export { getUser, login, logout, register };
