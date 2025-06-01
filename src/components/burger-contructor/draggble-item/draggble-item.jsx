import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { removeContent } from '@/services/slices/ingredients-constructor-slice.jsx';
import cl from './draggble-item.module.css';

const ItemTypes = {
	INGREDIENT: 'ingredient',
};

export const DraggableItem = ({ content, index, moveContent }) => {
	const dispatch = useDispatch();
	const ref = useRef(null);

	const [{ handlerId }, drop] = useDrop({
		accept: ItemTypes.INGREDIENT,
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item, monitor) {
			if (!ref.current) return;

			const dragIndex = item.index;
			const hoverIndex = index;

			if (dragIndex === hoverIndex) return;

			const hoverBoundingRect = ref.current.getBoundingClientRect();
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

			moveContent(dragIndex, hoverIndex);
			item.index = hoverIndex;
		},
	});

	const [{ isDragging }, drag] = useDrag({
		type: ItemTypes.INGREDIENT,
		item: () => {
			return { id: content.uniqueId, index };
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const opacity = isDragging ? 0.5 : 1;
	drag(drop(ref));

	return (
		<div
			className={cl.burger_element}
			ref={ref}
			data-handler-id={handlerId}
			style={{ opacity, cursor: 'move' }}>
			<ConstructorElement
				text={content.name}
				price={content.price}
				thumbnail={content.image}
				handleClose={() =>
					dispatch(removeContent({ uniqueId: content.uniqueId }))
				}
			/>
		</div>
	);
};
