import type { removedCartItem } from './types';
declare function removeCartItem(CustomerID: number, ShoeID: number): Promise<removedCartItem>;
export default removeCartItem;
