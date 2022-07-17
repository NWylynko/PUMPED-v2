import { t } from './trpc';

import { brandRouter } from "./brand";
import { cartRouter } from './cart';
import { customerRouter } from './customer';
import { imageRouter } from './image';
import { shoeRouter } from './shoe/router';

export const appRouter = t.router({
  brand: brandRouter,
  cart: cartRouter,
  customer: customerRouter,
  image: imageRouter,
  shoe: shoeRouter
})

// export type definition of API
export type AppRouter = typeof appRouter;
