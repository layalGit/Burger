import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cl from './ingredientsModal.module.css';

type propType = {
	props: {
		image: string;
		name: string;
		price: number;
		count: number;
	};
};
const IngredientsModal = ({ props }: propType) => {
	return (
		<div className={`${cl.container} mb-6`}>
			<div className={cl.containerImg}>
				<div className={cl.imageBlock}>
					<img className={cl.image} src={props.image} alt='' />
				</div>
				<p className='text text_type_main-default ml-3'>{props.name}</p>
			</div>
			<div>
				<div className={`ml-2 text text_type_digits-default ${cl.priceBlock}`}>
					{props.count}
					<p className='text text_type_digits-default'>X</p>
					<p className='text text_type_digits-default'>
						{props.price * props.count}
					</p>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	);
};

export default IngredientsModal;
