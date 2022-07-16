import type { WishListWithShoe } from './types';
declare function removeWishListItem(CustomerID: number, ShoeID: number): Promise<WishListWithShoe>;
export default removeWishListItem;
