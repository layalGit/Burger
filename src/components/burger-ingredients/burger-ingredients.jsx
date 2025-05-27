import React, { useState, useRef, useEffect } from 'react';
import styles from './burger-ingredients.module.css';
import * as PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '@utils/prop-types.js';
import { IngredientItem } from '@components/burger-ingredients/burger-Item/Ingredient-Item.jsx';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details.jsx';
import { Modal } from '@components/modal/modal.jsx';
import { useSelector } from 'react-redux';

export const BurgerIngredients = () => {
	const ingredients = useSelector((store) => store.ingredients.allIngredients);
	const scrollContainerRef = useRef(null);

	const filterByType = (ingredients, type) =>
		ingredients.filter((item) => item.type === type);

	const [activeTab, setActiveTab] = useState('bun');
	const [selectedIngredient, setSelectedIngredient] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	function handleScroll() {
		const sections = document.querySelectorAll('.ingredients-section');
		for (let i = 0; i < sections.length; i++) {
			const section = sections[i];
			const rect = section.getBoundingClientRect();

			if (
				rect.top <= window.innerHeight / 2 &&
				rect.bottom >= window.innerHeight / 2
			) {
				switch (i) {
					case 0:
						setActiveTab('bun');
						break;
					case 1:
						setActiveTab('sauce');
						break;
					case 2:
						setActiveTab('main');
						break;
					default:
						break;
				}

				break;
			}
		}
	}

	useEffect(() => {
		const container = scrollContainerRef.current;

		if (container) {
			container.addEventListener('scroll', handleScroll);

			return () => {
				container.removeEventListener('scroll', handleScroll);
			};
		}
	}, []);

	const openModal = (ingredient) => {
		setSelectedIngredient(ingredient);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setSelectedIngredient(null);
		setIsModalOpen(false);
	};

	const navigateToSection = (sectionId) => {
		const targetSection = document.getElementById(sectionId);
		targetSection.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<section className={styles.burger_ingredients}>
			<nav>
				<ul className={styles.menu}>
					<Tab
						value='bun'
						active={activeTab === 'bun'}
						onClick={() => {
							setActiveTab('bun');
							navigateToSection('buns');
						}}>
						Булки
					</Tab>
					<Tab
						value='sauce'
						active={activeTab === 'sauce'}
						onClick={() => {
							setActiveTab('sauce');
							navigateToSection('sauces');
						}}>
						Соусы
					</Tab>
					<Tab
						value='main'
						active={activeTab === 'main'}
						onClick={() => {
							setActiveTab('main');
							navigateToSection('fills');
						}}>
						Начинки
					</Tab>
				</ul>
			</nav>
			<div
				ref={scrollContainerRef}
				style={{ overflowY: 'auto', overflowX: 'hidden', maxHeight: '100%' }}
				className='custom-scroll'>
				<div id='buns' className='ingredients-section'>
					<p className='text text_type_main-medium mt-10'>Булки</p>
					<ul className={styles.ingredients_list}>
						{filterByType(ingredients, 'bun').map((item) => (
							<IngredientItem
								key={item._id}
								{...item}
								onClick={() => openModal(item)}
							/>
						))}
					</ul>
				</div>
				<div id='sauces' className='ingredients-section'>
					<p className='text text_type_main-medium mt-10'>Соусы</p>
					<ul className={styles.ingredients_list}>
						{filterByType(ingredients, 'sauce').map((item) => (
							<IngredientItem
								key={item._id}
								{...item}
								onClick={() => openModal(item)}
							/>
						))}
					</ul>
				</div>
				<div id='fills' className='ingredients-section'>
					<p className='text text_type_main-medium mt-10'>Начинки</p>
					<ul className={styles.ingredients_list}>
						{filterByType(ingredients, 'main').map((item) => (
							<IngredientItem
								key={item._id}
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
