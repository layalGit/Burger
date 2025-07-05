export function checkResponse<T>(response: Response): Promise<T> {
	if (!response.ok) {
		throw new Error(`Ошибка сервера: ${response.status}`);
	}
	return response.json() as Promise<T>;
}
