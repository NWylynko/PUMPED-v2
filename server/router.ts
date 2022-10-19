import { t } from './trpc';

import { router as shoeGridRouter } from "@/features/shoe/shoeGrid/routes/router"
import { router as addShoeRouter } from "@/features/shoe/addShoe/routes/router"
import { router as brandRouter } from "@/features/management/brands/routes/router"

export const appRouter = t.router({
  brands: brandRouter,
  shoeGrid: shoeGridRouter,
  addShoe: addShoeRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter;
