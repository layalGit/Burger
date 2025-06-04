import React from 'react';
import cl from './ingredient-details.module.css';
import { string, number } from 'prop-types';
import { useSelector } from 'react-redux';

export const IngredientDetails = () => {
	const SelectDetails = useSelector((store) => store.selectedIngredients);
	return (
		<div className={cl.details_content}>
			<img
				className={cl.details_image}
				src={SelectDetails.image_large}
				alt={SelectDetails.name}
			/>
			<p className='text_type_main-medium'>{SelectDetails.name}</p>
			<div
				className={`${cl.details_description} text_type_main-default  pb-15`}>
				<div className={cl.details_text}>
					<p>Калории, ккал</p>
					<p>{SelectDetails.calories}</p>
				</div>
				<div className={cl.details_text}>
					<p>Белки, г</p>
					<p>{SelectDetails.proteins}</p>
				</div>
				<div className={cl.details_text}>
					<p>Жиры, г</p>
					<p>{SelectDetails.fat}</p>
				</div>
				<div className={cl.details_text}>
					<p>Углеводы, г</p>
					<p>{SelectDetails.carbohydrates}</p>
				</div>
			</div>
		</div>
	);
};

IngredientDetails.propTypes = {
	image_large: string.isRequired,
	name: string.isRequired,
	calories: number.isRequired,
	proteins: number.isRequired,
	fat: number.isRequired,
	carbohydrates: number.isRequired,
};
