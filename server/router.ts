import { t } from './trpc';

import { router as shoeGridRouter } from "@/features/shoe/shoeGrid/routes/router"
import { router as shoeManagementRouter } from "@/features/management/shoes/routes/router"
import { router as brandManagementRouter } from "@/features/management/brands/routes/router"

export const appRouter = t.router({
  shoeGrid: shoeGridRouter,
  management: t.router({
    brands: brandManagementRouter,
    shoes: shoeManagementRouter
  })
})

// export type definition of API
export type AppRouter = typeof appRouter;
