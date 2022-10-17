import { t } from './trpc';

// import { brandRouter } from "./router/brand";
import { cartRouter } from './router/cart';
import { customerRouter } from './router/customer';
import { imageRouter } from './router/image';
import { shoeRouter } from './router/shoe/router';

import { router as shoeGridRouter } from "@/features/shoe/shoeGrid/routes/router"
import { router as addShoeRouter } from "@/features/shoe/addShoe/routes/router"
import { router as brandRouter } from "@/features/management/brands/routes/router"

export const appRouter = t.router({
  brands: brandRouter,
  // cart: cartRouter,
  // customer: customerRouter,
  // image: imageRouter,
  // shoe: shoeRouter,
  // shoeGrid: shoeGridRouter,
  // addShoe: addShoeRouter,
  
})

// export type definition of API
export type AppRouter = typeof appRouter;
