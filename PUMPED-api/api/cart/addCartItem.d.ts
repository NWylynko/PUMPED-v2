import type { partOfOrderItem } from '../order';
import type { AddedToCart } from './types';
export declare function addCartItem(CustomerID: number, ShoeID: number, { StockID, quantity }: partOfOrderItem): Promise<AddedToCart>;
export default addCartItem;
