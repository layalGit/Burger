import React, { useState } from 'react';
import cl from '@pages/pages.module.css';
import {
	Button,
	EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router';

const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const navigate = useNavigate();
	const NavigateLogin = () => {
		navigate('/Login');
	};
	const NavigateResetPassword = () => {
		navigate('/ResetPassword');
	};
	return (
		<div className={cl.container}>
			<p className='text text_type_main-medium'>Восстановление пароля</p>
			<EmailInput
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				isIcon={false}
				placeholder={'Укажите e-mail'}
			/>
			<Button
				htmlType='button'
				type='primary'
				size='medium'
				onClick={NavigateResetPassword}>
				Восстановить
			</Button>
			<div className={cl.flexColumn} style={{ marginTop: '30px' }}>
				<div className={cl.flexRow}>
					<p className='text text_type_main-default text_color_inactive'>
						Уже зарагестрированы?
					</p>
					<Button
						htmlType='button'
						type='secondary'
						size='medium'
						onClick={NavigateLogin}>
						Войти
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
