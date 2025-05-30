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
import { useDrop } from 'react-dnd';

export const BurgerConstructor = () => {
	const [buns, setBuns] = useState(null); // булки остаются null
	const [contents, setContents] = useState([]); // начинки начинаются с пустого массива

	const [, dropRef] = useDrop({
		// обработка приема булок
		accept: ['bun'],
		drop: (item) => {
			setBuns(item);
		},
	});

	const [, dropContentsRef] = useDrop({
		// прием начинок
		accept: ['main', 'sauce'],
		drop: (item) => {
			setContents((prev) => [...prev, item]); // добавляем новую начинку в массив
		},
	});

	const handleClickBun = () => {
		setBuns(null); // очистим булку при закрытии
	};

	const [isOpen, setIsOpen] = useState(false);
	const activeModal = () => {
		setIsOpen(true);
	};
	const onClose = () => setIsOpen(false);

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
							handleClose={handleClickBun}
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
								<div className={styles.order_summary} key={index}>
									<DragIcon type='primary' />
									<ConstructorElement
										key={index}
										text={content.name}
										price={content.price}
										thumbnail={content.image}
										handleClose={() =>
											handleClickBun()
										} /* Эта функция пока общая */
									/>
								</div>
							))
						) : (
							<div
								className={` ${styles.bun} ${styles.bun_top} text text_type_main-default`}>
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
							handleClose={handleClickBun}
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
