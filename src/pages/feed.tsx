import Order from '@components/order/order.tsx';
import cl from './pages.module.css';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@utils/hooks.tsx';
import {
	connectFeed,
	disconnectFeed,
} from '../services/actions/feedActions.ts';
import { WSS_URL } from '@/config/configAPI.ts';
import { Link, useLocation } from 'react-router-dom';

const Feed = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const ingredientsState = useAppSelector(
		(state) => state.ingredients.allIngredients
	);
	const state = useAppSelector((state) => state.feed.orders?.orders ?? []);
	useEffect(() => {
		dispatch(connectFeed(`${WSS_URL}orders/all`));
		return () => {
			dispatch(disconnectFeed());
		};
	}, []);
	const totalCompletedOrders = useAppSelector(
		(state) => state.feed.orders?.total ?? 0
	);

	const completedToday = useAppSelector(
		(state) => state.feed.orders?.totalToday ?? 0
	);

	const readyOrders = state.filter((order) => order.status === 'done');
	const inProgressOrders = state.filter((order) => order.status !== 'done');

	return (
		<div className={cl.container}>
			<div className={cl.flexRow}>
				<div className={` custom-scroll ${cl.orderBlock}`}>
					<p className='text text_type_digits-medium mt-1 ml-6 mb-6'>
						Лента заказов
					</p>

					{state.map((order) => (
						<Link
							style={{ textDecoration: 'none', color: 'white' }}
							key={order._id}
							to={`/feed/${order.number}`}
							state={{ background: location }}>
							<Order props={order} ingredients={ingredientsState} />
						</Link>
					))}
				</div>
				<div className='ml-15'>
					<div className={cl.twoColumnList}>
						<div>
							<h3 className='text text_type_main-default'>Готовы:</h3>
							<div className={cl.flexRowGap}>
								<ul className={cl.noStyleListColor}>
									{readyOrders.slice(0, 5).map((state) => (
										<li key={state._id} className='text text_type_main-default'>
											№{state.number}
										</li>
									))}
								</ul>
								<ul className={cl.noStyleListColor}>
									{readyOrders.slice(5, 10).map((state) => (
										<li key={state._id} className='text text_type_main-default'>
											№{state.number}
										</li>
									))}
								</ul>
							</div>
						</div>
						<div>
							<h3 className='text text_type_main-default'>В работе:</h3>
							<div className={cl.flexRowGap}>
								<ul className={cl.noStyleList}>
									{inProgressOrders.slice(0, 5).map((state) => (
										<li key={state._id} className='text text_type_main-default'>
											№{state.number}
										</li>
									))}
								</ul>
								<ul className={cl.noStyleList}>
									{inProgressOrders.slice(5, 10).map((state) => (
										<li key={state._id} className='text text_type_main-default'>
											№{state.number}
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
					<div>
						<p className='text text_type_main-medium'>
							Выполнено за все время:
							<p className='text text_type_digits-large'>
								{totalCompletedOrders}
							</p>
						</p>
					</div>
					<div>
						<p className='text text_type_main-medium'>
							Выполнено за сегодня:
							<p className='text text_type_digits-large'>{completedToday}</p>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Feed;
