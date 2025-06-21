import React, { useState } from 'react';
import cl from './pages.module.css';
import {
	Button,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '@/services/actions/authorizationActions.jsx';

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const handleClick = () => {
		dispatch(login({ email: email, password: password }));
	};
	const navigate = useNavigate();
	const NavigateRegister = () => {
		navigate('/Register');
	};
	const NavigateForgotPassword = () => {
		navigate('/ForgotPassword');
	};
	return (
		<div className={cl.container}>
			<p className='text text_type_main-medium'>Вход</p>
			<EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
			<PasswordInput
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<Button
				htmlType='button'
				type='primary'
				size='medium'
				onClick={handleClick}>
				Войти
			</Button>
			<div className={cl.flexColumn} style={{ marginTop: '30px' }}>
				<div className={cl.flexRow}>
					<p className='text text_type_main-default text_color_inactive'>
						Вы новый пользователь?
					</p>
					<Button
						htmlType='button'
						type='secondary'
						size='medium'
						onClick={NavigateRegister}>
						Зарегестрироваться
					</Button>
				</div>

				<div className={cl.flexRow}>
					<p className='text text_type_main-default text_color_inactive'>
						Забыли пароль?
					</p>
					<Button
						htmlType='button'
						type='secondary'
						size='medium'
						onClick={NavigateForgotPassword}>
						Восстановить пароль
					</Button>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
