import React, { useState } from 'react';
import cl from '@pages/pages.module.css';
import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router';

const RegisterPage = () => {
	const [inputValue, setInputValue] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();
	const NavigateLogin = () => {
		navigate('/Login');
	};
	const NavigateHome = () => {
		navigate('/');
	};
	return (
		<div className={cl.container}>
			<p className='text text_type_main-medium'>Регистрация</p>
			<Input
				placeholder={'Имя'}
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
			/>
			<EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
			<PasswordInput
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<Button
				htmlType='button'
				type='primary'
				size='medium'
				onClick={NavigateHome}>
				Зарагестрироваться
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

export default RegisterPage;
