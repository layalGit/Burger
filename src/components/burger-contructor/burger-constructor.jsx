import React, { useState } from 'react';
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
import { useDrop } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { OrderDetails } from '@components/order-details/order-details.jsx';
import {
	addBun,
	removeBun,
	addContent,
	removeContent,
} from '../../services/slices/ingredients-constructor-slice.jsx';
import { setOrderNumber } from '@/services/slices/created-order-slice.jsx';

export const BurgerConstructor = () => {
	const dispatch = useDispatch();

	const { buns, contents, totalPrice } = useSelector(
		(state) => state.constructorIngredients
	);

	const [, dropRef] = useDrop({
		accept: ['bun'],
		drop: (item) => {
			dispatch(addBun(item));
		},
	});

	const [, dropContentsRef] = useDrop({
		accept: ['main', 'sauce'],
		drop: (item) => {
			dispatch(addContent(item));
		},
	});

	const [isOpen, setIsOpen] = useState(false);
	const openOrderModal = () => {
		setIsOpen(true);
	};
	const closeOrderModal = () => {
		setIsOpen(false);
	};
	const handleSubmitOrder = async () => {
		try {
			if (!buns || !contents.length) return alert('Выберите ингредиенты');

			const ingredientsIds = [
				...new Set([...contents.map((c) => c._id), buns._id]),
			];

			// Отправляем запрос на создание заказа
			const response = await fetch(
				'https://norma.nomoreparties.space/api/orders',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ ingredients: ingredientsIds }),
				}
			);

			if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);

			const data = await response.json();

			if (data.success && data.order.number) {
				dispatch(setOrderNumber(data.order.number));
				openOrderModal();
			} else {
				throw new Error('Ошибка оформления заказа');
			}
		} catch (err) {
			alert(err.message);
		}
	};
	return (
		<section className={`${styles.burger_constructor} mt-25`}>
			<div className={`${styles.burger_items}  mb-10 pr-1`}>
				<div ref={dropRef} className='mr-4'>
					{buns ? (
						<ConstructorElement
							text={buns.name}
							price={buns.price}
							thumbnail={buns.image}
							type='top'
							handleClose={() => dispatch(removeBun())}
						/>
					) : (
						<div
							className={` ${styles.bun} ${styles.bun_top} text text_type_main-default`}>
							<p>Выберите булку</p>
						</div>
					)}
				</div>

				<div
					className={`${styles.burger_scroll} ${styles.burger_list} custom-scroll  pr-2 `}>
					<div
						ref={dropContentsRef}
						className={`  ${styles.bun_middle} text text_type_main-default`}>
						{contents.length > 0 ? (
							contents.map((content, index) => (
								<div className={styles.burger_element} key={index}>
									<DragIcon type='primary' />
									<ConstructorElement
										key={content.id}
										text={content.name}
										price={content.price}
										thumbnail={content.image}
										handleClose={() =>
											dispatch(removeContent({ id: content.id }))
										}
									/>
								</div>
							))
						) : (
							<div
								className={` ${styles.bun} ${styles.bun_middle} text text_type_main-default`}>
								<p>Выберите начинку</p>
							</div>
						)}
					</div>
				</div>

				<div className='mr-4'>
					{buns ? (
						<ConstructorElement
							text={buns.name}
							price={buns.price}
							thumbnail={buns.image}
							type='bottom'
							handleClose={() => dispatch(removeBun())}
						/>
					) : (
						<div
							className={` ${styles.bun} ${styles.bun_bottom} text text_type_main-default`}>
							<p>Выберите булку</p>
						</div>
					)}
				</div>
			</div>

			<div className={styles.order_summary}>
				<span className={`${styles.order_summary_span} mr-10`}>
					<p className='text text_type_digits-medium'>{totalPrice}</p>
					<CurrencyIcon type='primary' />
				</span>
				<Button htmlType='button' type='primary' onClick={handleSubmitOrder}>
					Оформить заказ
				</Button>
			</div>

			<Modal isOpen={isOpen} onClose={closeOrderModal}>
				<OrderDetails />
			</Modal>
		</section>
	);
};

BurgerConstructor.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
