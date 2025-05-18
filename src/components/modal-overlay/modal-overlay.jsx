import React from 'react';
import cl from './modal-overlay.module.css';

export const ModalOverlay = ({ onClick }) => {
	const handleClose = (event) => {
		if (event.type === 'keydown' && [' ', 'Escape'].includes(event.key)) {
			event.preventDefault();
			onClick();
		}
	};

	return (
		<div
			className={cl.overlay}
			tabIndex='0'
			role='button'
			onClick={onClick}
			onKeyDown={handleClose}></div>
	);
};
