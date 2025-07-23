import { BASE_URL } from '@/config/configAPI.ts';
import {
	setOrderNumber,
	startLoading,
	stopLoading,
} from '../slices/created-order-slice.tsx';
import {
	buns,
	content,
} from '@services/slices/ingredients-constructor-slice.tsx';
import { Dispatch, AnyAction } from '@reduxjs/toolkit';

export const submitOrder =
	(buns: buns | null, contents: content[], accessToken: string | null) =>
	async (dispatch: Dispatch<AnyAction>) => {
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
			if (err instanceof Error) {
				alert(err.message);
			} else {
				alert('err');
			}
			dispatch(stopLoading());
		}
	};
