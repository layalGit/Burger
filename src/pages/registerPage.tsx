import { FormEvent, useState } from 'react';
import cl from '@pages/pages.module.css';
import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/actions/authorizationActions.ts';
import { useAppDispatch } from '@utils/hooks.tsx';
import { RegisterRequestData } from '@utils/api.ts';

const RegisterPage = () => {
	const [username, setusername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const registerData: RegisterRequestData = {
		username,
		password,
		email,
	};
	const dispatch = useAppDispatch();
	const handleClick = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(register(registerData));
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
					value={username}
					onChange={(e) => setusername(e.target.value)}
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
