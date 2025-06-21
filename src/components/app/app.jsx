import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchIngredients } from '@/services/actions/ingredientsActions.jsx';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import HomePage from '@pages/homePage.jsx';
import LoginPage from '@pages/loginPage.jsx';
import NotFound from '@pages/NotFound.jsx';
import RegisterPage from '@pages/registerPage.jsx';
import ForgotPassword from '@pages/forgot-password.jsx';
import ResetPassword from '@pages/reset-password.jsx';
import { AppHeader } from '@components/app-header/app-header.jsx';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details.jsx';
import { Modal } from '@components/modal/modal.jsx';
import ProfilePage from '@pages/profilePage.jsx';
import { checkUserAuth } from '@/services/actions/authorizationActions.jsx';
import { OnlyAuth, OnlyUnAuth } from '@components/protected-route.jsx';

export const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchIngredients());
		dispatch(checkUserAuth());
	}, [dispatch]);
	const location = useLocation();
	const navigate = useNavigate();
	const background = location.state && location.state.background;

	const handleModalClose = () => {
		navigate(-1);
	};
	return (
		<>
			<AppHeader />
			<Routes location={background || location}>
				<Route path='/' element={<OnlyAuth component={<HomePage />} />} />
				<Route
					path='/login'
					element={<OnlyUnAuth component={<LoginPage />} />}
				/>
				<Route
					path='/profile'
					element={<OnlyAuth component={<ProfilePage />} />}
				/>
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/forgotpassword' element={<ForgotPassword />} />
				<Route path='/resetpassword' element={<ResetPassword />} />

				<Route
					path='/ingredients/:ingredientId'
					element={<IngredientDetails />}
				/>

				<Route path='*' element={<NotFound />} />
			</Routes>

			{background && (
				<>
					<Routes>
						<Route
							path='/ingredients/:ingredientId'
							element={
								<Modal title={'Ингредиент'} onClose={handleModalClose}>
									<IngredientDetails />
								</Modal>
							}
						/>
					</Routes>
				</>
			)}
		</>
	);
};
