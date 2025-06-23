import React, { useState } from 'react';
import cl from '@pages/pages.module.css';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetPassword } from '@/services/actions/authorizationActions.jsx';

const ResetPassword = () => {
	const [password, setPassword] = useState('');
	const [input, setInput] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleClick = (event) => {
		event.preventDefault();
		dispatch(resetPassword({ password: password, token: input }));
	};
	const NavigateLogin = () => {
		navigate('/Login');
	};
	return (
		<div className={cl.container}>
			<p className='text text_type_main-medium'>Восстановление пароля</p>
			<form onSubmit={handleClick} className={cl.flexForm}>
				<PasswordInput
					placeholder={'Введите новый пароль'}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Input
					placeholder={'Введите код из письма'}
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<Button htmlType='submit' type='primary' size='medium'>
					Сохранить
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

export default ResetPassword;
