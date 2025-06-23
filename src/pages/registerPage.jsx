import React, { useState } from 'react';
import cl from '@pages/pages.module.css';
import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '@/services/actions/authorizationActions.jsx';

const RegisterPage = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const handleClick = (event) => {
		event.preventDefault();
		dispatch(register({ email: email, name: name, password: password }));
	};

	const navigate = useNavigate();
	const NavigateLogin = () => {
		navigate('/Login');
	};
	return (
		<div className={cl.container}>
			<p className='text text_type_main-medium'>Регистрация</p>
			<form onSubmit={handleClick} className={cl.flexForm}>
				<Input
					placeholder={'Имя'}
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
				<PasswordInput
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button htmlType='submit' type='primary' size='medium'>
					Зарагестрироваться
				</Button>
			</form>
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
