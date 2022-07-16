declare function getWishlist(CustomerID: number): Promise<{
    ShoeID: number;
}[]>;
export default getWishlist;
