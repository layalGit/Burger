import React, { useCallback, useState } from 'react';
import styles from './burger-constructor.module.css';
import {
	Button,
	ConstructorElement,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '@components/modal/modal.jsx';
import { useDrop } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { OrderDetails } from '@components/order-details/order-details.jsx';
import {
	addBun,
	addContent,
	updateIngredientsOrder,
} from '../../services/slices/ingredients-constructor-slice.jsx';
import { setOrderNumber } from '@/services/slices/created-order-slice.jsx';
import { BASE_URL } from '@/config/configAPI.jsx';
import { checkResponse } from '@utils/checkResponse.jsx';
import { DraggableItem } from '@components/burger-contructor/draggble-item/draggble-item.jsx';

export const BurgerConstructor = () => {
	const dispatch = useDispatch();
	const { buns, contents, totalPrice } = useSelector(
		(state) => state.constructorIngredients
	);

	const [, dropRef] = useDrop({
		accept: 'bun',
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
	const openOrderModal = () => setIsOpen(true);
	const closeOrderModal = () => setIsOpen(false);

	const handleSubmitOrder = async () => {
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
			const data = await checkResponse(response);

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

	const moveContent = useCallback(
		(dragIndex, hoverIndex) => {
			dispatch(updateIngredientsOrder({ dragIndex, hoverIndex }));
		},
		[dispatch]
	);

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
							isLocked={true}
						/>
					) : (
						<div
							className={` ${styles.bun} ${styles.bun_top} text text_type_main-default`}>
							<p>Выберите булку</p>
						</div>
					)}
				</div>

				<div
					className={`${styles.burger_scroll} ${styles.burger_list} custom-scroll pr-2`}>
					<div
						ref={dropContentsRef}
						className={`${styles.bun_middle} text text_type_main-default`}>
						{contents.length > 0 ? (
							contents.map((content, index) => (
								<DraggableItem
									content={content}
									index={index}
									key={content.uniqueId}
									moveContent={moveContent}
								/>
							))
						) : (
							<div
								className={`${styles.bun} ${styles.bun_middle} text text_type_main-default`}>
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
							isLocked={true}
						/>
					) : (
						<div
							className={`${styles.bun} ${styles.bun_bottom} text text_type_main-default`}>
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
