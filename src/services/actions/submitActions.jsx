import { BASE_URL } from '@/config/configAPI.ts';
import {
	setOrderNumber,
	startLoading,
	stopLoading,
} from '@/services/slices/created-order-slice.jsx';

export const submitOrder =
	(buns, contents, accessToken) => async (dispatch) => {
		try {
			if (!buns || !contents.length) return alert('Выберите ингредиенты');

			const ingredientsIds = [
				...new Set([...contents.map((c) => c._id), buns._id]),
			];
			dispatch(startLoading());
			const response = await fetch(`${BASE_URL}/orders`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					authorization: `${accessToken}`,
				},
				body: JSON.stringify({ ingredients: ingredientsIds }),
			});

			const data = await response.json();

			if (response.ok && data.success && data.order?.number) {
				dispatch(setOrderNumber(data.order.number));
			} else {
				throw new Error('Ошибка оформления заказа');
			}
			dispatch(stopLoading());
		} catch (err) {
			alert(err.message);
			dispatch(stopLoading());
		}
	};
