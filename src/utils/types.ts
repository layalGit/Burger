export type OrdersResponse = {
	success: boolean;
	total: number;
	totalToday: number;
	orders: Array<Order>;
};

export type Order = {
	_id: string;
	name: string;
	number: number;
	status: string;
	createdAt: string;
	updatedAt: string;
	ingredients: Array<string>;
};
