import * as trpc from '@trpc/server';

import { exampleRouter } from "./example";

export const appRouter = trpc.router()
  .merge("example.", exampleRouter)

// export type definition of API
export type AppRouter = typeof appRouter;
