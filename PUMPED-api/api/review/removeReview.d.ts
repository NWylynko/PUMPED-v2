declare function removeReview(CustomerID: number, ShoeID: number): Promise<{
    CustomerID: number;
    ShoeID: number;
}>;
export default removeReview;
