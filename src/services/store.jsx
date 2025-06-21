import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredients-slice.jsx';
import constructorReducer from './slices/ingredients-constructor-slice.jsx';
import userReducer from './slices/user-slice.jsx';
import orderReducer from './slices/created-order-slice.jsx';

const store = configureStore({
	reducer: {
		ingredients: ingredientsReducer,
		user: userReducer,
		orderIngredients: orderReducer,
		constructorIngredients: constructorReducer,
	},
});

export default store;
