import { t } from './trpc';

import { brandRouter } from "./router/brand";
import { cartRouter } from './router/cart';
import { customerRouter } from './router/customer';
import { imageRouter } from './router/image';
import { shoeRouter } from './router/shoe/router';

import { router as shoeGridRouter } from "@/features/shoe/shoeGrid/routes/router"

export const appRouter = t.router({
  brand: brandRouter,
  cart: cartRouter,
  customer: customerRouter,
  image: imageRouter,
  shoe: shoeRouter,
  shoeGrid: shoeGridRouter
})

// export type definition of API
export type AppRouter = typeof appRouter;
