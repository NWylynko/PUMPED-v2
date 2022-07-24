import { t } from "../../trpc";
import { z } from "zod";
import { getMethods } from "./methods";

const getCart = async (customerId: string) => {
  const { getActiveCart, createActiveCart } = await getMethods()
  const result = await getActiveCart({ customerId })
  const [cart] = result.getCustomer?.orders ?? []

  if (cart) {
    return cart
  }

  const result2 = await createActiveCart({ customerId });
  const [newCart] = result2.addOrder?.order ?? []

  if (!newCart) {
    throw new Error(`failed to create active cart`);
  }

  return newCart;
}

export const cartRouter = t.router({
  get: t.procedure
    .query(async ({ ctx: { user: { uid } } }) => {
      return getCart(uid);
    }),
  add: t.procedure
    .input(z.object({
      shoeId: z.string(),
      stockId: z.string(),
      quantity: z.number()
    }))
    .mutation(async ({ input, ctx: { user: { uid } } }) => {
      const { AddShoeToCart } = await getMethods()
      const cart = await getCart(uid);

      const result = await AddShoeToCart({
        orderId: cart.orderId,
        shoeId: input.shoeId,
        stockId: input.stockId,
        quantity: input.quantity
      })

      return result.addOrderItem?.orderItem
    }),
  checkout: t.procedure
    .input(z.object({
      address: z.string()
    }))
    .mutation(async ({ input, ctx: { user: { uid } } }) => {
      const { getOrderDetails, SetOrderShoePrice, processCart } = await getMethods()
      const { orderId } = await getCart(uid);

      const { getOrder: order } = await getOrderDetails({ orderId });

      if (!order) {
        throw new Error(`Order ${orderId} not found`);
      }

      if (order.paid === true) {
        throw new Error(`Order ${orderId} is already paid for`)
      }

      if (order.activeCart === false) {
        throw new Error(`Order ${orderId} is not active`)
      }

      if (!order.items) {
        throw new Error(`Order ${orderId} has no items`)
      }

      if (order.items.length === 0) {
        throw new Error(`Order ${orderId} has no items`)
      }

      await Promise.allSettled(order.items?.map(async (item) => {
        const orderItemId = item?.orderItemId
        const price = item?.shoe.price
        const shoeId = item?.shoe.shoeId

        if (!orderItemId) {
          throw new Error(`orderItemId is undefined in order ${orderId}`)
        }

        if (!price) {
          throw new Error(`no price has been defined for ${shoeId} in order ${orderId}`)
        }

        return SetOrderShoePrice({ orderItemId, price })
      }))

      const total = order.items.reduce((total, item) => {
        const shoeId = item?.shoe.shoeId
        const price = item?.shoe.price
        const quantity = item?.quantity

        if (!quantity) {
          throw new Error(`orderItemId is undefined in order ${orderId}`)
        }

        if (!price) {
          throw new Error(`no price has been defined for ${shoeId} in order ${orderId}`)
        }

        total += price * quantity

        return total
      }, 0);

      const result = await processCart({
        orderId,
        address: input.address,
        date: new Date(),
        total
      })

      return result.updateOrder?.order
    })
});