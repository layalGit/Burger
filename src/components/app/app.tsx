import { useEffect } from 'react';
import { fetchIngredients } from '../../services/actions/ingredientsActions.ts';
import { checkUserAuth } from '../../services/actions/authorizationActions.ts';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import HomePage from '@pages/homePage.tsx';
import LoginPage from '@pages/loginPage.tsx';
import NotFound from '@pages/NotFound.tsx';
import RegisterPage from '@pages/registerPage.tsx';
import ForgotPassword from '@pages/forgot-password.tsx';
import ResetPassword from '@pages/reset-password.tsx';

import { AppHeader } from '@components/app-header/app-header.tsx';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details.tsx';
import { Modal } from '@components/modal/modal.tsx';
import ProfilePage from '@pages/profilePage.tsx';
import { OnlyAuth, OnlyUnAuth } from '@components/protected-route.tsx';
import { useAppDispatch } from '@utils/hooks.tsx';
import OrdersProfile from '@pages/ordersProfile.tsx';
import Feed from '@pages/feed.tsx';
import OrderInfoPage from '@pages/orderInfoPage.tsx';

export const App = () => {
	const dispatch = useAppDispatch();
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
				<Route path='/' element={<HomePage />} />
				<Route
					path='/login'
					element={<OnlyUnAuth component={<LoginPage />} />}
				/>
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/forgotpassword' element={<ForgotPassword />} />
				<Route path='/resetpassword' element={<ResetPassword />} />

				<Route
					path='/ingredients/:ingredientId'
					element={<IngredientDetails />}
				/>
				<Route
					path='/profile'
					element={<OnlyAuth component={<ProfilePage />} />}
				/>
				<Route
					path='/profile/orders'
					element={<OnlyAuth component={<OrdersProfile />} />}
				/>
				<Route
					path='/profile/orders/:number'
					element={<OnlyAuth component={<OrderInfoPage />} />}
				/>
				<Route path='/feed' element={<Feed />} />
				<Route path='/feed/:number' element={<OrderInfoPage />} />
				<Route path='*' element={<NotFound />} />
			</Routes>

			{background && (
				<>
					<Routes>
						<Route
							path='/profile/orders/:number'
							element={
								<OnlyAuth
									component={
										<Modal onClose={handleModalClose}>
											<OrderInfoPage />
										</Modal>
									}
								/>
							}
						/>
						<Route
							path='/feed/:number'
							element={
								<Modal onClose={handleModalClose}>
									<OrderInfoPage />
								</Modal>
							}
						/>
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
