import React from 'react';
import cl from './Ingredient-Item.module.css';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { string, number, func } from 'prop-types';

export const IngredientItem = ({ image, name, price, onClick }) => {
	return (
		<button className={`${cl.main} mt-6 mr-1`} onClick={onClick}>
			<img src={image} alt={name} className='pr-4' />
			<span className={`${cl.text} text text_type_digits-default pt-1 pb-1`}>
				{price}
				<CurrencyIcon type='primary' />
			</span>
			<p className='text text_type_main-default'>{name}</p>
			<Counter count={1} size='default' extraClass='m-1' />
		</button>
	);
};

IngredientItem.propTypes = {
	image: string.isRequired,
	name: string.isRequired,
	price: number.isRequired,
	onClick: func.isRequired,
};
