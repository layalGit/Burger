import { BASE_URL } from '@/config/configAPI.jsx';
import { setOrderNumber } from '@/services/slices/created-order-slice.jsx';

export const submitOrder = (buns, contents) => async (dispatch) => {
	try {
		if (!buns || !contents.length) return alert('Выберите ингредиенты');

		const ingredientsIds = [
			...new Set([...contents.map((c) => c._id), buns._id]),
		];

		const response = await fetch(`${BASE_URL}/orders`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ingredients: ingredientsIds }),
		});

		const data = await response.json();

		if (response.ok && data.success && data.order?.number) {
			dispatch(setOrderNumber(data.order.number));
		} else {
			throw new Error('Ошибка оформления заказа');
		}
	} catch (err) {
		alert(err.message);
	}
};
