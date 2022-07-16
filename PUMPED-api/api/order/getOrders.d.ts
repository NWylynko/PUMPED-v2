import type { Order } from './types';
declare function getOrders(CustomerID: number): Promise<Order[]>;
export default getOrders;
