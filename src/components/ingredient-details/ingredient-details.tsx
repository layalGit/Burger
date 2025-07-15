import { useSelector } from 'react-redux';
import cl from './ingredient-details.module.css';
import { useParams } from 'react-router-dom';
import { Ingredient } from '@components/burger-ingredients/burger-ingredients.tsx';

export const IngredientDetails = () => {
	const { ingredientId } = useParams();
	const allIngredients = useSelector(
		//@ts-expect-error 'ignore'
		(store) => store.ingredients.allIngredients
	);
	const ingredient = allIngredients.find(
		(item: Ingredient) => item._id === ingredientId
	);
	if (!ingredient) {
		return <div>Ингредиент не найден</div>;
	}
	return (
		<div className={cl.details_content}>
			<img
				className={cl.details_image}
				src={ingredient.image_large}
				alt={ingredient.name}
			/>
			<p className='text_type_main-medium'>{ingredient.name}</p>
			<div className={`${cl.details_description} text_type_main-default pb-15`}>
				<div className={cl.details_text}>
					<p>Калории, ккал</p>
					<p>{ingredient.calories}</p>
				</div>
				<div className={cl.details_text}>
					<p>Белки, г</p>
					<p>{ingredient.proteins}</p>
				</div>
				<div className={cl.details_text}>
					<p>Жиры, г</p>
					<p>{ingredient.fat}</p>
				</div>
				<div className={cl.details_text}>
					<p>Углеводы, г</p>
					<p>{ingredient.carbohydrates}</p>
				</div>
			</div>
		</div>
	);
};
