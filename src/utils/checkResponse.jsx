export function checkResponse(response) {
	if (!response.ok) {
		throw new Error(`Ошибка сервера: ${response.status}`);
	}
	return response.json();
}
