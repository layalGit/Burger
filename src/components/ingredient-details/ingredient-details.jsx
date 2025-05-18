import React from 'react';
import cl from './ingredient-details.module.css';
import { string, number } from 'prop-types';

export const IngredientDetails = ({
	image_large,
	name,
	calories,
	proteins,
	fat,
	carbohydrates,
}) => {
	return (
		<div className={cl.details_content}>
			<img className={cl.details_image} src={image_large} alt={name} />
			<p className='text_type_main-medium'>{name}</p>
			<div
				className={`${cl.details_description} text_type_main-default  pb-15`}>
				<div className={cl.details_text}>
					<p>Калории, ккал</p>
					<p>{calories}</p>
				</div>
				<div className={cl.details_text}>
					<p>Белки, г</p>
					<p>{proteins}</p>
				</div>
				<div className={cl.details_text}>
					<p>Жиры, г</p>
					<p>{fat}</p>
				</div>
				<div className={cl.details_text}>
					<p>Углеводы, г</p>
					<p>{carbohydrates}</p>
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
