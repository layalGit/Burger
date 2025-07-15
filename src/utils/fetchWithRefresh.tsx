import { BASE_URL } from '../config/configAPI.ts';

const checkReponse = (res: Response) => {
	return res.ok
		? res.json()
		: res.json().then((err: unknown) => Promise.reject(err));
};

export const refreshToken = () => {
	return (
		fetch(`${BASE_URL}/auth/token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({
				token: localStorage.getItem('refreshToken'),
			}),
		})
			.then(checkReponse)
			// !! Важно для обновления токена в мидлваре, чтобы запись токенов
			// была тут, а не в fetchWithRefresh
			.then((refreshData) => {
				if (!refreshData.success) {
					return Promise.reject(refreshData);
				}
				localStorage.setItem('refreshToken', refreshData.refreshToken);
				localStorage.setItem('accessToken', refreshData.accessToken);
				return refreshData;
			})
	);
};

export const fetchWithRefresh = async (url: string, options: RequestInit) => {
	try {
		const res = await fetch(url, options);
		return await checkReponse(res);
	} catch (err: unknown) {
		if (err instanceof Error && err.message === 'jwt expired') {
			const refreshData = await refreshToken();
			if (options.headers !== undefined) {
				if (options.headers instanceof Headers) {
					options.headers.set('authorization', refreshData.accessToken);
				} else if (Array.isArray(options.headers)) {
					options.headers.push(['authorization', refreshData.accessToken]);
				} else if (
					typeof options.headers === 'object' &&
					options.headers !== null
				) {
					options.headers = {
						...options.headers,
						authorization: refreshData.accessToken,
					};
				}
			}
			const res = await fetch(url, options); //повторяем запрос
			return await checkReponse(res);
		} else {
			return Promise.reject(err);
		}
	}
};
