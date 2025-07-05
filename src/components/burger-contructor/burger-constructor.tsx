import styles from './burger-constructor.module.css';
import {
	Button,
	ConstructorElement,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '@components/modal/modal.tsx';
import { useDrop } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { OrderDetails } from '../order-details/order-details.tsx';

import {
	addBun,
	addContent,
	updateIngredientsOrder, // @ts-expect-error 'ignore'
} from '../../services/slices/ingredients-constructor-slice.jsx';
import {
	DraggableItem,
	TIngredient,
} from '@components/burger-contructor/draggble-item/draggble-item.tsx';
// @ts-expect-error 'ignore'
import { submitOrder } from '@/services/actions/submitActions.jsx';
import { OnlyAuth } from '@components/protected-route.tsx';
import { useCallback, useState } from 'react';

type moveContent = (dragIndex: number, hoverIndex: number) => void;
export const BurgerConstructor = () => {
	const dispatch = useDispatch();
	const { buns, contents, totalPrice } = useSelector(
		// @ts-expect-error 'ignore'
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
	const token = localStorage.getItem('accessToken');
	const handleSubmitOrder = async () => {
		openOrderModal();
		dispatch(submitOrder(buns, contents, token));
	};

	const moveContent: moveContent = useCallback(
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
							contents.map((content: TIngredient, index: number) => (
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

			{isOpen && (
				<OnlyAuth
					component={
						<Modal onClose={closeOrderModal}>
							<OrderDetails />
						</Modal>
					}
				/>
			)}
		</section>
	);
};
