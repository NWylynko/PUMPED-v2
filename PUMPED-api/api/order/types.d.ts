export interface Order {
    ID: number;
    CustomerID: number;
    dateOfPurchase?: number;
    paid: 0 | 1;
    deliveryAddress?: string;
    activeCart: 0 | 1;
}
export interface OrderItem {
    OrderID: number;
    ShoeID: number;
    StockID: number;
    quantity: number;
    price?: number;
    currentPrice: number;
}
export interface partOfOrderItem {
    StockID?: number;
    quantity?: number;
}
export interface partOfOrderItemWithIDs extends partOfOrderItem {
    CustomerID: number;
    ShoeID: number;
}
