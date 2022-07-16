export interface ShoePrices {
    ShoeID: number;
    price: number;
}
export interface removedCartItem {
    OrderID: number;
    ShoeID: number;
    CustomerID: number;
}
export interface clearedCart {
    CustomerID: number;
    OrderID: number;
}
export interface AddedToCart {
    CustomerID: number;
    ShoeID: number;
    OrderID: number;
    StockID: number;
    quantity: number;
}
