import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchIngredients } from '@/services/actions/ingredientsActions.jsx';
import { BrowserRouter, Route, Routes } from 'react-router';

import HomePage from '@pages/homePage.jsx';
import LoginPage from '@pages/loginPage.jsx';
import NotFound from '@pages/NotFound.jsx';
import RegisterPage from '@pages/registerPage.jsx';
import ForgotPassword from '@pages/forgot-password.jsx';
import ResetPassword from '@pages/reset-password.jsx';

export const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchIngredients());
	}, [dispatch]);

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/Login' element={<LoginPage />} />
				<Route path='/Register' element={<RegisterPage />} />
				<Route path='/ForgotPassword' element={<ForgotPassword />} />
				<Route path='/ResetPassword' element={<ResetPassword />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};
