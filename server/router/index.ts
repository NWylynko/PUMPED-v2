import * as trpc from '@trpc/server';

import { brandRouter } from "./brand/router";

export const appRouter = trpc.router()
  .merge("brand.", brandRouter)

// export type definition of API
export type AppRouter = typeof appRouter;
