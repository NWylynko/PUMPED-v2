import type { OrderItem } from './types';
declare function getOrderItems(OrderID: number): Promise<OrderItem[]>;
export default getOrderItems;
