import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import cl from './pages.module.css';
import {
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/services/actions/authorizationActions.jsx';

const ProfilePage = () => {
	const state = useSelector((state) => state.user.user.user);
	const [inputValue, setInputValue] = useState(state.name);
	const [email, setEmail] = useState(state.email);
	const [password, setPassword] = useState(state.password);
	const dispatch = useDispatch();
	const handleClick = () => {
		dispatch(logout());
	};
	return (
		<div className={cl.container}>
			<div className={cl.profileFlex}>
				<div className={cl.profileNav}>
					<NavLink
						to='/profile'
						end
						className={({ isActive }) =>
							`${cl.navLink} ${isActive ? cl.active : ''} pt-4 pb-4`
						}>
						Профиль
					</NavLink>
					<NavLink
						to='/'
						end
						className={({ isActive }) =>
							`${cl.navLink} ${isActive ? cl.active : ''} pt-4 pb-4`
						}>
						История заказов
					</NavLink>
					<NavLink
						to='/'
						end
						className={({ isActive }) =>
							`${cl.navLink} ${isActive ? cl.active : ''} pt-4 pb-4`
						}
						onClick={handleClick}>
						Выход
					</NavLink>
					<p className='text text_type_main-default text_color_inactive mt-20'>
						В этом разделе вы можете изменить свои персональные данные
					</p>
				</div>
				<div className={cl.profileInput}>
					<form className={cl.flexForm}>
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
					</form>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
