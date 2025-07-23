import done from '../../images/done.png';
import cl from './order-details.module.css';
import { Preloader } from '../preloader/preloader.tsx';
import { useAppSelector } from '@utils/hooks.tsx';

export const OrderDetails = () => {
	const order = useAppSelector((state) => state.orderIngredients);
	return (
		<div className={`${cl.order_details} text_type_main-default`}>
			<p className={`${cl.shadow} text text_type_digits-large`}>
				{order.orderNumber}
			</p>
			{order.isLoading ? <Preloader /> : null}
			<p className='text_type_main-medium'>идентификатор заказа</p>
			<img className='pt-5 pb-5' src={done} alt='done' />
			<p>Ваш заказ начали готовить</p>
			<p className={`${cl.text} pb-15`}>
				Дождитесь готовности на орбитальной станции
			</p>
		</div>
	);
};
