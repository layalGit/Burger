import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@utils/hooks.tsx';
import { useParams } from 'react-router-dom';
import { getOrderByNumber } from '../services/slices/created-order-slice.tsx';
import { Preloader } from '@/components/preloader/preloader.tsx';
import cl from './pages.module.css';
import IngredientsModal from '@components/ingredients-modal/ingredients-modal.tsx';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';

const OrderInfoPage = () => {
	const dispatch = useAppDispatch();
	const { number } = useParams();
	const ingredientsState = useAppSelector(
		(state) => state.ingredients.allIngredients
	);
	const order = useAppSelector((state) => {
		let order = state.feed.orders?.orders.find((o) => o.number === +number!);
		if (order) {
			return order;
		}
		order = state.ordersProfile.orders?.orders.find(
			(o) => o.number === +number!
		);
		if (order) {
			return order;
		}
		order = state.orderIngredients.orderData ?? undefined;
		if (order?.number === +number!) {
			return order;
		}
		return null;
	});

	useEffect(() => {
		if (!order) {
			dispatch(getOrderByNumber(+number!));
		}
	}, []);

	if (!order) {
		return <Preloader />;
	}

	const ingredientsCounts: Record<string, number> = {};
	order.ingredients.forEach((ingredientId) => {
		ingredientsCounts[ingredientId] =
			(ingredientsCounts[ingredientId] || 0) + 1;
	});

	const uniqueIngredients = Array.from(new Set(order.ingredients))
		.map((id) => {
			const ingredient = ingredientsState.find((item) => item._id === id);
			return ingredient
				? { ...ingredient, count: ingredientsCounts[id] }
				: null;
		})
		.filter(Boolean);

	const totalPrice = uniqueIngredients.reduce(
		(acc, curr) => acc + curr!.price * curr!.count,
		0
	);

	const createdAt = order.createdAt;

	return (
		<div className={cl.modalContainer}>
			<div className={cl.modalInfo}>
				<p className={`text text_type_digits-default mb-10 ${cl.modalNumber}`}>
					#{order.number}
				</p>
				<p className='text text_type_main-default mb-3'>{order.name}</p>
				<p className='text text_type_main-default mb-15'>
					{order.status === 'done' ? (
						<p style={{ color: '#00CCCC' }}>Выполнен</p>
					) : order.status === 'created' ? (
						<p>Создан </p>
					) : order.status === 'pending' ? (
						<p>Готовится</p>
					) : null}
				</p>
				<p className='text text_type_main-default mb-6'>Состав:</p>
			</div>
			<div className={`custom-scroll ${cl.ingredientModal}`}>
				{uniqueIngredients.map(
					(ingredient) =>
						ingredient && (
							<IngredientsModal key={ingredient._id} props={ingredient} />
						)
				)}
			</div>
			<div className={cl.blockTimeTotal}>
				<p className='text text_type_main-default text_color_inactive'>
					<FormattedDate date={new Date(createdAt)} />
				</p>
				<div>
					<span className='text text_type_digits-default mr-2'>
						{totalPrice}
					</span>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	);
};

export default OrderInfoPage;
