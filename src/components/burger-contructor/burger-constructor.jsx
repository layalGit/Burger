import styles from './burger-constructor.module.css';
import * as PropTypes from 'prop-types';
import { ingredientPropType } from '@utils/prop-types.js';
import {
	Button,
	CurrencyIcon,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '@components/modal/modal.jsx';
import { useState } from 'react';
import { OrderDetails } from '@components/order-details/order-details.jsx';

export const BurgerConstructor = () => {
	const [isOpen, setIsOpen] = useState(false);
	const activeModal = () => {
		setIsOpen(true);
	};
	const onClose = () => setIsOpen(false);

	return (
		<section className={`${styles.burger_constructor} mt-25`}>
			<div className={`${styles.burger_items}  mb-10 pr-1`}>
				<div className='mr-4'>
					<div
						className={` ${styles.bun} ${styles.bun_top} text text_type_main-default`}>
						<p>Выберите булку</p>
					</div>
				</div>
				<div
					className={`${styles.burger_scroll} ${styles.burger_list} custom-scroll  pr-2 `}>
					<DragIcon type='primary' />
					<div
						className={` ${styles.bun} ${styles.bun_middle} text text_type_main-default`}>
						<p>Выберите начинку</p>
					</div>
				</div>
				<div className='mr-4'>
					<div
						className={` ${styles.bun} ${styles.bun_bottom} text text_type_main-default`}>
						<p>Выберите начинку</p>
					</div>
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
