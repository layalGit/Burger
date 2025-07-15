import cl from '@pages/pages.module.css';
import {
	Button,
	EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//@ts-expect-error 'ignore'
import { forgotPassword } from '@/services/actions/authorizationActions.jsx';
import { FormEvent, useState } from 'react';

const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const NavigateLogin = () => {
		navigate('/Login');
	};
	const NavigateResetPassword = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(forgotPassword({ email: email }))
			.then(() => {
				navigate('/ResetPassword');
			})
			.catch((error: Error) => {
				console.error('Ошибка при восстановлении пароля:', error);
			});
	};
	return (
		<div className={cl.container}>
			<p className='text text_type_main-medium'>Восстановление пароля</p>
			<form onSubmit={NavigateResetPassword} className={cl.flexForm}>
				<EmailInput
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					isIcon={false}
					placeholder={'Укажите e-mail'}
				/>
				<Button htmlType='submit' type='primary' size='medium'>
					Восстановить
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

export default ForgotPassword;
