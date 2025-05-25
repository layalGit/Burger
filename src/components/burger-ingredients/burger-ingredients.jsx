import React, { useState } from 'react';
import styles from './burger-ingredients.module.css';
import * as PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '@utils/prop-types.js';
import { IngredientItem } from '@components/burger-ingredients/burger-Item/Ingredient-Item.jsx';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details.jsx';
import { Modal } from '@components/modal/modal.jsx';

export const BurgerIngredients = ({ ingredients }) => {
	const filterByType = (ingredients, type) =>
		ingredients.filter((item) => item.type === type);

	const [selectedIngredient, setSelectedIngredient] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = (ingredient) => {
		setSelectedIngredient(ingredient);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setSelectedIngredient(null);
		setIsModalOpen(false);
	};

	return (
		<section className={styles.burger_ingredients}>
			<nav>
				<ul className={styles.menu}>
					<Tab value='bun' active={true} onClick={() => {}}>
						Булки
					</Tab>
					<Tab value='main' active={false} onClick={() => {}}>
						Соусы
					</Tab>
					<Tab value='sauce' active={false} onClick={() => {}}>
						Начинки
					</Tab>
				</ul>
			</nav>
			<div
				style={{
					overflowY: 'auto',
					overflowX: 'hidden',
					maxHeight: '100%',
				}}
				className='custom-scroll'>
				<div>
					<p className='text text_type_main-medium mt-10'>Булки</p>
					<ul className={styles.ingredients_list}>
						{filterByType(ingredients, 'bun').map((item) => (
							<IngredientItem
								key={item.id}
								{...item}
								onClick={() => openModal(item)}
							/>
						))}
					</ul>
				</div>
				<div>
					<p className='text text_type_main-medium mt-10'>Соусы</p>
					<ul className={styles.ingredients_list}>
						{filterByType(ingredients, 'sauce').map((item) => (
							<IngredientItem
								key={item.id}
								{...item}
								onClick={() => openModal(item)}
							/>
						))}
					</ul>
				</div>
				<div>
					<p className='text text_type_main-medium mt-10'>Начинки</p>
					<ul className={styles.ingredients_list}>
						{filterByType(ingredients, 'main').map((item) => (
							<IngredientItem
								key={item.id}
								{...item}
								onClick={() => openModal(item)}
							/>
						))}
					</ul>
				</div>
			</div>
			{isModalOpen && (
				<Modal
					title='Детали ингредиента'
					isOpen={isModalOpen}
					onClose={closeModal}>
					<IngredientDetails {...selectedIngredient} />
				</Modal>
			)}
		</section>
	);
};

BurgerIngredients.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
