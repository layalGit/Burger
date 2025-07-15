import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredients-slice.tsx';
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
