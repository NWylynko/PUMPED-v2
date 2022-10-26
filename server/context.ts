import { inferAsyncReturnType } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { getUserFromHeader } from "./getUserFromHeader";

export async function createContext({ req, res }: trpcNext.CreateNextContextOptions) {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers


  // instead of calling this potentially expensive call
  // on every request, we just pass along a function to
  // do it. If the handler needs the user they can call
  // it as they see fit. This cuts down on the overhead
  // as we are not doing any more then we need to.
  const getUser = () => getUserFromHeader(req);

  return {
    getUser,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
