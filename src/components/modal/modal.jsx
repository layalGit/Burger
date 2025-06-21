import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '@components/modal-overlay/modal-overlay.jsx';
import cl from './modal.module.css';
import { func, node, string } from 'prop-types';

export const Modal = ({ title, children, onClose }) => {
	const modalRoot = useRef(document.getElementById('modal-root'));
	const [open, setOpen] = useState(true); // начальное состояние открыто

	useEffect(() => {
		const handleEscapePress = (event) => {
			if (event.key === 'Escape') {
				closeModal(); // закрываем модал при нажатии Esc
			}
		};

		document.addEventListener('keydown', handleEscapePress);

		return () => {
			document.removeEventListener('keydown', handleEscapePress);
		};
	}, []);

	function closeModal() {
		setOpen(false);
		onClose();
	}

	return open
		? createPortal(
				<>
					<ModalOverlay onClick={closeModal} />
					<div className={cl.modal_content}>
						<div className={`${cl.modal_header} pt-10 pr-10 pl-10`}>
							<p className='text_type_main-large'>{title}</p>
							<CloseIcon type='primary' onClick={closeModal} />
						</div>
						<div>{children}</div>
					</div>
				</>,
				modalRoot.current
			)
		: null;
};

Modal.propTypes = {
	title: string.isRequired,
	children: node.isRequired,
	onClose: func.isRequired,
};
