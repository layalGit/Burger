import cl from '@pages/pages.module.css';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { logout } from '../services/actions/authorizationActions.ts';
import { useAppDispatch, useAppSelector } from '@utils/hooks.tsx';
import { useEffect } from 'react';
import { WSS_URL } from '@/config/configAPI.ts';
import {
	connectOrders,
	disconnectOrders,
} from '../services/actions/ordersProfileActions.ts';
import Order from '@components/order/order.tsx';

const OrdersProfile = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const handleClick = () => {
		dispatch(logout());
	};
	const state = useAppSelector(
		(state) => state.ordersProfile.orders?.orders ?? []
	);
	const ingredientsState = useAppSelector(
		(state) => state.ingredients.allIngredients
	);

	useEffect(() => {
		const accessToken =
			localStorage.getItem('accessToken')?.replace('Bearer ', '') ?? '';
		dispatch(connectOrders(`${WSS_URL}orders?token=${accessToken}`));
		return () => {
			dispatch(disconnectOrders());
		};
	}, []);

	return (
		<div className={cl.containerRow}>
			<div className={cl.profileNav}>
				<NavLink
					to='/profile'
					end
					className={({ isActive }) =>
						`${cl.navLink} ${isActive ? cl.active : ''} pt-4 pb-4`
					}>
					Профиль
				</NavLink>
				<NavLink
					to='/profile/orders'
					end
					className={({ isActive }) =>
						`${cl.navLink} ${isActive ? cl.active : ''} pt-4 pb-4`
					}>
					История заказов
				</NavLink>
				<NavLink
					to='/'
					end
					className={({ isActive }) =>
						`${cl.navLink} ${isActive ? cl.active : ''} pt-4 pb-4`
					}
					onClick={handleClick}>
					Выход
				</NavLink>
				<p className='text text_type_main-default text_color_inactive mt-20'>
					В этом разделе вы можете изменить свои персональные данные
				</p>
			</div>
			<div className={` custom-scroll ${cl.orderBlock}`}>
				{state.map((order) => (
					<Link
						style={{ textDecoration: 'none', color: 'white' }}
						key={order._id}
						to={`/profile/orders/${order.number}`}
						state={{ background: location }}>
						<Order props={order} ingredients={ingredientsState} />
					</Link>
				))}
			</div>
		</div>
	);
};
export default OrdersProfile;
