import { OrdersResponse } from '@/utils/types';
import { createAction } from '@reduxjs/toolkit';

export const connectFeed = createAction<string>('ws/connectFeed');
export const disconnectFeed = createAction('ws/disconnectFeed');
export const connectingFeed = createAction('ws/connectingFeed');
export const openFeed = createAction('ws/openFeed');
export const closeFeed = createAction('ws/closeFeed');
export const errorFeed = createAction<string>('ws/errorFeed');
export const sendFeedMessage = createAction('ws/sendMessageFeed');
export const receiveFeedMessage = createAction<
	OrdersResponse,
	'ws/receiveMessageFeed'
>('ws/receiveMessageFeed');
