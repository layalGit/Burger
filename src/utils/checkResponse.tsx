type ApiResponse<T> = {
	success: boolean;
	data: T;
	message?: string;
};

export const checkResponse = async <T,>(
	response: Response
): Promise<ApiResponse<T>> => {
	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.message || 'Ошибка сервера');
	}
	return data;
};
