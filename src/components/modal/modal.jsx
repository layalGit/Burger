import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '@components/modal-overlay/modal-overlay.jsx';
import cl from './modal.module.css';

export const Modal = ({ title, children, isOpen, onClose }) => {
	const modalRoot = useRef(document.getElementById('modal-root'));

	useEffect(() => {
		const handleEscapePress = (event) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscapePress);

		return () => {
			document.removeEventListener('keydown', handleEscapePress);
		};
	}, [onClose]);

	return isOpen
		? createPortal(
				<>
					<ModalOverlay onClick={onClose} />
					<div className={cl.modal_content}>
						<div className={`${cl.modal_header} pt-10 pr-10 pl-10`}>
							<p className='text_type_main-large'>{title}</p>
							<CloseIcon type='primary' onClick={onClose} />
						</div>
						<div>{children}</div>
					</div>
				</>,
				modalRoot.current
			)
		: null;
};
