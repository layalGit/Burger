import cl from './modal-overlay.module.css';
import React, { FC } from 'react';

type ModalOverlayProps = {
	onClick: () => void;
};

export const ModalOverlay: FC<ModalOverlayProps> = ({ onClick }) => {
	const handleClose = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.type === 'keydown' && [' ', 'Escape'].includes(event.key)) {
			event.preventDefault();
			onClick();
		}
	};

	return (
		<div
			className={cl.overlay}
			tabIndex={0}
			role='button'
			onClick={onClick}
			onKeyDown={handleClose}
			data-testid='modal-overlay'></div>
	);
};
