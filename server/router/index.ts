import { t } from './trpc';

import { brandRouter } from "./brand/router";

export const appRouter = t.router({
  brand: brandRouter
})

// export type definition of API
export type AppRouter = typeof appRouter;
