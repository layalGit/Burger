import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import cl from './pages.module.css';
import {
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { logout } from '@/services/actions/authorizationActions.jsx';

const ProfilePage = () => {
	const [inputValue, setInputValue] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const handleClick = () => {
		dispatch(logout());
	};
	return (
		<div className={cl.container}>
			<div className={cl.profileFlex}>
				<div className={cl.profileNav}>
					<NavLink to='/profile'> Профиль</NavLink>
					<NavLink to='/'>История заказов</NavLink>
					<NavLink onClick={handleClick} to='/'>
						Выход
					</NavLink>
					<p className='text text_type_main-default text_color_inactive mt-20'>
						В этом разделе вы можете изменить свои персональные данные
					</p>
				</div>
				<div className={cl.profileInput}>
					<Input
						placeholder={'Имя'}
						value={inputValue}
						onChange={(e) => setInputValue(e.currentTarget.value)}
						icon={'EditIcon'}
					/>
					<EmailInput
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						icon={'EditIcon'}
					/>
					<PasswordInput
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						icon={'EditIcon'}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
