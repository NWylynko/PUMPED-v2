import type { partOfOrderItem } from '../order';
declare function updateCartItem(CustomerID: number, ShoeID: number, fields: partOfOrderItem): Promise<{
    StockID?: number | undefined;
    quantity?: number | undefined;
    CustomerID: number;
    OrderID: number;
    ShoeID: number;
}>;
export default updateCartItem;
