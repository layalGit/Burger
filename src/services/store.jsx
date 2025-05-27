import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredients-slice.jsx';
import constructorReducer from './slices/ingredients-constructor-slice.jsx';
import selectedReducer from './slices/selected-ingredients-slice.jsx';
import orderReducer from './slices/created-order-slice.jsx';

const store = configureStore({
	reducer: {
		ingredients: ingredientsReducer,
		selectedIngredients: selectedReducer,
		orderIngredients: orderReducer,
		constructorIngredients: constructorReducer,
	},
});

export default store;
