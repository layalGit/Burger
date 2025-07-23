import cl from './order.module.css';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '@components/burger-ingredients/burger-ingredients.tsx';
import { Order as OrderType } from '../../utils/types.ts';

type OrderProps = {
	props: OrderType;
	ingredients: Ingredient[];
};
const Order = ({ props, ingredients }: OrderProps) => {
	const createdAt = props.createdAt;
	const ingredientImages = props.ingredients.map((ingredientId) => {
		const ingredient = ingredients.find((ing) => ing._id === ingredientId);
		return ingredient?.image;
	});
	const totalPrice = props.ingredients.reduce((total, ingredientId) => {
		const ingredient = ingredients.find((ing) => ing._id === ingredientId);
		if (ingredient) {
			return total + ingredient.price;
		}
		return total;
	}, 0);

	return (
		<div className={cl.container}>
			<div className={cl.center}>
				<div className={cl.numberDate}>
					<p className='text text_type_digits-default'>#{props.number}</p>
					<p className='text text_type_main-default text_color_inactive'>
						<FormattedDate date={new Date(createdAt)} />
					</p>
				</div>
				<p className='text text_type_main-medium mt-6'>{props.name}</p>
				<p className='text text_type_main-default mb-15'>
					{props.status === 'done' ? (
						<p style={{ color: '#00CCCC' }}>Выполнен</p>
					) : props.status === 'created' ? (
						<p>Создан </p>
					) : props.status === 'pending' ? (
						<p>Готовится</p>
					) : null}
				</p>
				<div className={cl.imagePrice}>
					<div className={cl.ingredientImages}>
						{ingredientImages.slice(0, 6).map((image, index) => (
							<img
								key={index}
								src={image}
								alt={''}
								className={cl.ingredientImage}
							/>
						))}
						{ingredientImages.length > 6 && (
							<p
								className={`text text_type_digits-default ${cl.ingredientCount}`}>
								+{ingredientImages.length - 6}
							</p>
						)}
					</div>
					<div className={cl.price}>
						<p className='text text_type_main-medium'>{totalPrice}</p>
						<CurrencyIcon type='primary' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Order;
