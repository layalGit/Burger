import React, { useEffect, useState } from 'react';
import styles from './app.module.css';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.jsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.jsx';
import { AppHeader } from '@components/app-header/app-header.jsx';

export const App = () => {
	const UrlApi = 'https://norma.nomoreparties.space/api/ingredients';
	const [ingredients, setIngredients] = useState([]);
	useEffect(() => {
		function fetchIngredients() {
			fetch(UrlApi)
				.then((response) => {
					if (!response.ok) {
						throw new Error(`Ошибка сервера: ${response.status}`);
					}
					return response.json();
				})
				.then((data) => {
					setIngredients(data.data);
				})
				.catch((error) => {
					console.error('Ошибка загрузки ингредиентов:', error.message);
				});
		}

		fetchIngredients();
	}, []);
	return (
		<div className={styles.app}>
			<AppHeader />
			<h1
				className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
				Соберите бургер
			</h1>
			<main className={`${styles.main} pl-5 pr-5`}>
				<BurgerIngredients ingredients={ingredients} />
				<BurgerConstructor ingredients={ingredients} />
			</main>
		</div>
	);
};
