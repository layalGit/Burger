import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
//@ts-expect-error 'ignore'
import { removeContent } from '@/services/slices/ingredients-constructor-slice.jsx';
import cl from './draggble-item.module.css';
import type { Identifier } from 'dnd-core';

const ItemTypes = {
	INGREDIENT: 'ingredient',
};
export type TIngredient = {
	name: string;
	price: number;
	image: string;
	uniqueId: string;
};
type TBurgerConstructorItem = {
	content: TIngredient;
	index: number;
	moveContent: (dragIndex: number, hoverIndex: number) => void;
};
type DragObject = TIngredient & { index: number };
type DragCollectedProps = { isDragging: boolean };
type DropCollectedProps = { handlerId: Identifier | null };
export const DraggableItem = ({
	content,
	index,
	moveContent,
}: TBurgerConstructorItem): React.JSX.Element => {
	const dispatch = useDispatch();
	const ref = useRef<HTMLDivElement | null>(null);

	const [{ handlerId }, drop] = useDrop<
		DragObject,
		unknown,
		DropCollectedProps
	>({
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
			if (!clientOffset) return;
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

			moveContent(dragIndex, hoverIndex);
			item.index = hoverIndex;
		},
	});

	const [{ isDragging }, drag] = useDrag<
		DragObject,
		unknown,
		DragCollectedProps
	>({
		type: ItemTypes.INGREDIENT,
		item: () => {
			return { ...content, index };
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
