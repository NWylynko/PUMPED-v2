import type { Review } from './types';
declare function getReviews(ShoeID: number): Promise<Review[]>;
export default getReviews;
