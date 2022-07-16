import type { reviewDetails } from './types';
declare function addReview(CustomerID: number, ShoeID: number, { stars, message, timestamp, }: reviewDetails): Promise<{
    ShoeID: number;
    CustomerID: number;
    stars: number;
    message: string;
    timestamp: number;
}>;
export default addReview;
