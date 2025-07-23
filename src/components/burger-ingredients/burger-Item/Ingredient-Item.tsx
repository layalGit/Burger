import cl from './Ingredient-Item.module.css';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { string, number, func } from 'prop-types';
import { useDrag } from 'react-dnd';
import { IngredientType } from '@components/burger-ingredients/burger-ingredients.tsx';
import { useAppSelector } from '@utils/hooks.tsx';

type IngredientItemProps = {
	image: string;
	name: string;
	price: number;
	onClick?: () => void;
	_id: string;
	type: IngredientType;
};
export const IngredientItem = ({
	image,
	name,
	price,
	onClick,
	_id,
	type,
}: IngredientItemProps) => {
	const counts = useAppSelector((state) => state.constructorIngredients.counts);
	const ingredientCount = counts[_id];

	const [{ isDragging }, dragRef] = useDrag({
		type: type,
		item: { _id, image, name, price, type },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	});

	return (
		<button
			ref={dragRef}
			className={`${cl.main} mt-6 mr-1`}
			onClick={onClick}
			style={{ opacity: isDragging ? 0.5 : 1 }}>
			<img src={image} alt={name} className='pr-4' />
			<span className={`${cl.text} text text_type_digits-default pt-1 pb-1`}>
				{price}
				<CurrencyIcon type='primary' />
			</span>
			<p className='text text_type_main-default'>{name}</p>
			{ingredientCount > 0 && (
				<Counter count={ingredientCount} size='default' extraClass='m-1' />
			)}
		</button>
	);
};

IngredientItem.propTypes = {
	image: string.isRequired,
	name: string.isRequired,
	price: number.isRequired,
	onClick: func.isRequired,
};
