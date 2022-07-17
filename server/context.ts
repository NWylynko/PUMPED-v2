import { inferAsyncReturnType } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { getUserFromHeader } from './getUserFromHeader';

export async function createContext({
  req,
  res,
}: trpcNext.CreateNextContextOptions) {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers

  // This is just an example of something you'd might want to do in your ctx fn

  const user = await getUserFromHeader(req);

  return {
    user,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;