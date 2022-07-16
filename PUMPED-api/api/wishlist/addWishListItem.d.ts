import type { WishListWithShoe } from './types';
declare function addWishListItem(CustomerID: number, ShoeID: number): Promise<WishListWithShoe>;
export default addWishListItem;
