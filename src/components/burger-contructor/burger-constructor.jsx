import styles from './burger-constructor.module.css';
import * as PropTypes from 'prop-types';
import { ingredientPropType } from '@utils/prop-types.js';
import {
	Button,
	ConstructorElement,
	CurrencyIcon,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '@components/modal/modal.jsx';
import { useState } from 'react';
import { OrderDetails } from '@components/order-details/order-details.jsx';

export const BurgerConstructor = ({ ingredients }) => {
	console.log(ingredients);
	const [isOpen, setIsOpen] = useState(false);
	const activeModal = () => {
		setIsOpen(true);
	};
	const onClose = () => setIsOpen(false);
	const filterByBun = (ingredients) =>
		ingredients.filter((item) => item.name === 'Краторная булка N-200i');
	const filterByIngredients = (ingredients) =>
		ingredients.filter((item) => item.name !== 'Краторная булка N-200i');

	const Bun = filterByBun(ingredients);
	const OtherIngredients = filterByIngredients(ingredients);
	return (
		<section className={`${styles.burger_constructor} mt-25`}>
			<div className={`${styles.burger_items}  mb-10 pr-1`}>
				<div className='mr-4'>
					{Bun.map((item) => (
						<ConstructorElement
							type='top'
							isLocked={true}
							text={`${item.name} (верх)`}
							price={item.price}
							thumbnail={item.image}
						/>
					))}
				</div>
				<div className={`${styles.burger_scroll}  custom-scroll`}>
					{OtherIngredients.map((item) => (
						<div className={`${styles.burger_list} pb-4 pr-2`}>
							<DragIcon type='primary' />
							<ConstructorElement
								text={item.name}
								price={item.price}
								thumbnail={item.image}
							/>
						</div>
					))}
				</div>
				<div className='mr-4'>
					{Bun.map((item) => (
						<ConstructorElement
							type='bottom'
							isLocked={true}
							text={`${item.name} (низ)`}
							price={item.price}
							thumbnail={item.image}
						/>
					))}
				</div>
			</div>
			<div className={styles.order_summary}>
				<span className={`${styles.order_summary_span} mr-10`}>
					<p className='text text_type_digits-medium'>610</p>
					<CurrencyIcon type='primary' />
				</span>
				<Button htmlType='button' type='primary' onClick={activeModal}>
					Оформить заказ
				</Button>
			</div>
			<Modal isOpen={isOpen} onClose={onClose}>
				<OrderDetails />
			</Modal>
		</section>
	);
};

BurgerConstructor.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
