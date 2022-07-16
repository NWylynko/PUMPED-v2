import type { BrandWithID, Brand, partOfBrand, partOfBrandWithID } from '@/PUMPED-api/api/brand/types';
import type { removedCartItem, clearedCart, AddedToCart } from '@/PUMPED-api/api/cart/types';
import type { Collection, CollectionWithID } from '@/PUMPED-api/api/collection/types';
import type { Colour, ColourWithID, partOfColour, updatedColour, addedColour } from '@/PUMPED-api/api/colour/types';

import type { ShoeWithColours, ShoeWithDetails } from '@/PUMPED-api/api/shoe/types';
import type { Review } from '@/PUMPED-api/api/review/types';
import type { Customer, CustomerWithID } from '@/PUMPED-api/api/customer/types';
import type { partOfOrderItem, OrderItem, partOfOrderItemWithIDs } from '@/PUMPED-api/api/order/types';

import type { WishListWithShoe, WishList } from '@/PUMPED-api/api/wishlist/types'

const x = {
  get: async (url: string) => {
    return null as any;
  },
  post: async (url: string, fields: any) => {
    return null as any;
  },
  patch: async (url: string, fields: any) => {
    return null as any;
  },
  delete: async (url: string) => {
    return null as any;
  }
}

// brand
export const getBrand = (BrandID: number | string): Promise<BrandWithID> => x.get(`brand/${BrandID}`)
export const addBrand = (fields: Brand): Promise<Brand> => x.post(`brand`, fields)
export const updateBrand = (BrandID: number | string, fields: partOfBrand): Promise<partOfBrandWithID> => x.patch(`brand/${BrandID}`, fields)
export const removeBrand = (BrandID: number | string): Promise<{ BrandID: number }> => x.delete(`brand/${BrandID}`)

//cart
export const getCart = (): Promise<OrderItem[]> => x.get(`cart`)
export const addToCart = (ShoeID: number | string, fields: partOfOrderItem): Promise<AddedToCart> => x.post(`cart/add/${ShoeID}`, fields)
export const checkoutCart = (address: string): Promise<{ CustomerID: number; OrderID: number; }> => x.post(`cart/checkout`, { address })
export const updateCart = (ShoeID: number | string, fields: partOfOrderItem): Promise<partOfOrderItemWithIDs> => x.patch(`cart/${ShoeID}`, fields)
export const removeCartItem = (ShoeID: number | string): Promise<removedCartItem> => x.delete(`cart/${ShoeID}`)
export const clearCart = (): Promise<clearedCart> => x.delete(`cart`)

//collection
export const getCollection = (CollectionID: number | string): Promise<CollectionWithID> => x.get(`collection/${CollectionID}`)
export const addCollection = (fields: Collection): Promise<{ name: string; }> => x.post(`collection`, fields)
export const updateCollection = (CollectionID: number | string, fields: Collection): Promise<{ name?: string | undefined; CollectionID: number; }> => x.patch(`collection/${CollectionID}`, fields)
export const removeCollection = (CollectionID: number | string): Promise<{ CollectionID: number; }> => x.delete(`collection/${CollectionID}`)

//colour
export const getColour = (ColourID: number | string): Promise<ColourWithID> => x.get(`colour/${ColourID}`)
export const addColour = (fields: Colour): Promise<addedColour> => x.post(`colour`, fields)
export const updateColour = (ColourID: number | string, fields: partOfColour): Promise<updatedColour> => x.patch(`colour/${ColourID}`, fields)
export const removeColour = (ColourID: number | string): Promise<{ ColourID: number; }> => x.delete(`colour/${ColourID}`)

//customer
export const addCustomer = async (fields: Customer): Promise<CustomerWithID> => {
  const CustomerDetails = await x.post(`customer`, fields)

  // setCustomerIDHeader(CustomerDetails.ID)

  return CustomerDetails
}

//image

//order

//review
export const getReviews = (id: string | number): Promise<Review[]> => x.get(`review/${id}`)

//section

//shoe
export const getShoes = (): Promise<ShoeWithColours[]> => x.get('shoe')
export const getShoe = (id: string | number): Promise<ShoeWithDetails> => x.get(`shoe/${id}`)

//stock

//style

//tag

//wishlist
export const getWishlist = (): Promise<{ ShoeID: number; }[]> => x.get(`wishlist`)
export const isInWishlist = (ShoeID: string | number): Promise<boolean> => x.get(`wishlist/${ShoeID}`)
export const addToWishlist = (ShoeID: string | number): Promise<WishListWithShoe> => x.post(`wishlist/${ShoeID}`, {})
export const removeFromWishlist = (ShoeID: string | number): Promise<WishListWithShoe> => x.delete(`wishlist/${ShoeID}`)
export const clearWishlist = (): Promise<WishList> => x.delete(`wishlist`)