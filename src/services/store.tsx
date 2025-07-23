import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredients-slice.tsx';
import constructorReducer from './slices/ingredients-constructor-slice.tsx';
import userReducer from './slices/user-slice.tsx';
import orderReducer from './slices/created-order-slice.tsx';
import ordersProfileReducer from './slices/orders-profile-slice.tsx';
import feedReducer from './slices/feed-slice.tsx';
import socketMiddleware from './socketMiddleware.tsx';
import {
	closeFeed,
	connectFeed,
	connectingFeed,
	disconnectFeed,
	errorFeed,
	openFeed,
	receiveFeedMessage,
	sendFeedMessage,
} from '../services/actions/feedActions.ts';
import {
	closeOrders,
	connectingOrders,
	connectOrders,
	disconnectOrders,
	errorOrders,
	openOrders,
	receiveOrdersMessage,
	sendFeedOrders,
} from '../services/actions/ordersProfileActions.ts';

const wsActionsFeed = {
	connect: connectFeed,
	disconnect: disconnectFeed,
	onConnecting: connectingFeed,
	onOpen: openFeed,
	onClose: closeFeed,
	onError: errorFeed,
	sendMessage: sendFeedMessage,
	onMessage: receiveFeedMessage,
};
const wsActionsOrders = {
	connect: connectOrders,
	disconnect: disconnectOrders,
	onConnecting: connectingOrders,
	onOpen: openOrders,
	onClose: closeOrders,
	onError: errorOrders,
	sendMessage: sendFeedOrders,
	onMessage: receiveOrdersMessage,
};
const feedMiddleware = socketMiddleware(wsActionsFeed);
const ordersMiddleware = socketMiddleware(wsActionsOrders);
const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	user: userReducer,
	orderIngredients: orderReducer,
	constructorIngredients: constructorReducer,
	ordersProfile: ordersProfileReducer,
	feed: feedReducer,
});
const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(feedMiddleware, ordersMiddleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;
