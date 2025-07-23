import { OrdersResponse } from '@/utils/types';
import { createAction } from '@reduxjs/toolkit';

export const connectOrders = createAction<string>('ws/connectOrders');
export const disconnectOrders = createAction('ws/disconnectOrders');
export const connectingOrders = createAction('ws/connectingOrders');
export const openOrders = createAction('ws/openOrders');
export const closeOrders = createAction('ws/closeOrders');
export const errorOrders = createAction<string>('ws/errorOrders');
export const sendFeedOrders = createAction('ws/sendMessageOrders');
export const receiveOrdersMessage = createAction<
	OrdersResponse,
	'ws/receiveMessageOrders'
>('ws/receiveMessageOrders');
