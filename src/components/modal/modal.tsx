import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '@components/modal-overlay/modal-overlay.tsx';
import cl from './modal.module.css';

type ModalProps = {
	title?: string;
	onClose: () => void;
	children: ReactNode;
};
export const Modal: FC<ModalProps> = ({ title, children, onClose }) => {
	const modalRoot = useRef(document.getElementById('modal-root'));
	const [open, setOpen] = useState(true);
	const closeModal = () => {
		setOpen(false);
		onClose();
	};

	useEffect(() => {
		const handleEscapePress = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setOpen(false);
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscapePress);

		return () => {
			document.removeEventListener('keydown', handleEscapePress);
		};
	}, [onClose]);

	if (!open || !modalRoot.current) return null;
	return open
		? createPortal(
				<>
					<ModalOverlay onClick={closeModal} />
					<div className={cl.modal_content} data-testid='modal-content'>
						<div className={`${cl.modal_header} pt-10 pr-10 pl-10`}>
							<p className='text_type_main-large' data-testid='modal-title'>
								{title}
							</p>
							<div data-testid='modal-close-icon'>
								<CloseIcon type='primary' onClick={closeModal} />
							</div>
						</div>
						<div>{children}</div>
					</div>
				</>,
				modalRoot.current
			)
		: null;
};
