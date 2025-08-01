import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientItem } from '@components/burger-ingredients/burger-Item/Ingredient-Item.tsx';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '@utils/hooks.tsx';

export type IngredientType = 'bun' | 'main' | 'sauce';
export type Ingredient = {
	_id: string;
	name: string;
	type: IngredientType;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_large: string;
	image_mobile: string;
	__v: number;
};
export const BurgerIngredients = () => {
	const ingredients = useAppSelector(
		(store) => store.ingredients.allIngredients || []
	);
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const filterByType = (ingredients: Ingredient[], type: IngredientType) =>
		ingredients.filter((item) => item.type === type);

	const [activeTab, setActiveTab] = useState('bun');

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

	const navigateToSection = (sectionId: string) => {
		const targetSection = document.getElementById(sectionId);
		if (targetSection) {
			targetSection.scrollIntoView({ behavior: 'smooth' });
		}
	};
	const location = useLocation();
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
							<Link
								data-testid='ingredientBun'
								key={item._id}
								to={`/ingredients/${item._id}`}
								state={{ background: location }}>
								<IngredientItem {...item} />
							</Link>
						))}
					</ul>
				</div>
				<div id='sauces' className='ingredients-section'>
					<p className='text text_type_main-medium mt-10'>Соусы</p>
					<ul className={styles.ingredients_list}>
						{filterByType(ingredients, 'sauce').map((item) => (
							<Link
								data-testid='ingredientSauce'
								key={item._id}
								to={`/ingredients/${item._id}`}
								state={{ background: location }}>
								<IngredientItem {...item} />
							</Link>
						))}
					</ul>
				</div>
				<div id='fills' className='ingredients-section'>
					<p className='text text_type_main-medium mt-10'>Начинки</p>
					<ul className={styles.ingredients_list}>
						{filterByType(ingredients, 'main').map((item) => (
							<Link
								data-testid='ingredientMain'
								key={item._id}
								to={`/ingredients/${item._id}`}
								state={{ background: location }}>
								<IngredientItem {...item} />
							</Link>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
};
