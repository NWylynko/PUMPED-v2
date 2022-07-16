declare function checkoutCart(CustomerID: number, address: string): Promise<{
    CustomerID: number;
    OrderID: number;
}>;
export default checkoutCart;
