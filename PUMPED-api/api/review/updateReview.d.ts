import type { partOfReview } from './types';
declare function updateReview(CustomerID: number, ShoeID: number, fields: partOfReview): Promise<partOfReview>;
export default updateReview;
