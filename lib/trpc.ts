import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from '../pages/api/trpc/[trpc]';
import { parse } from 'cookie';
import { getDomain } from "../config/getDomain";
import superjson from 'superjson';
import { httpBatchLink } from '@trpc/client';

export const trpc = createTRPCNext<AppRouter>({
  // @ts-ignore
  config({ ctx }) {

    if (typeof window !== 'undefined') {
      // during client requests
      return {
        // transformer: superjson, // i wanna use this for the better object support but seems to be broken right now
        links: [
          httpBatchLink({
            url: '/api/trpc',
          }),
        ]
      };
    }
    // during SSR below

    // optional: use SSG-caching for each rendered page (see caching section for more details)
    const ONE_DAY_SECONDS = 60 * 60 * 24;
    ctx?.res?.setHeader(
      'Cache-Control',
      `s-maxage=1, stale-while-revalidate=${ONE_DAY_SECONDS}`,
    );

    const domain = getDomain();
    const url = `${domain}/api/trpc`

    const cookie = ctx?.req?.headers.cookie
    let jwt: string | undefined;

    if (cookie) {
      const obj = parse(cookie)
      jwt = obj.jwt !== "undefined" ? obj.jwt : undefined
    }


    return {
      // transformer: superjson, // see above
      links: [
        httpBatchLink({
          url,
          headers() {
            if (ctx?.req) {


              // To use SSR properly, you need to forward the client's headers to the server
              // This is so you can pass through things like cookies when we're server-side rendering

              // If you're using Node 18, omit the "connection" header

              // If you don't remove the connection header, the data fetching will fail 
              // with TRPCClientError: fetch failed because connection is a forbidden header name.
              const {
                connection: _connection,
                ...headers
              } = ctx.req.headers;


              return {
                ...headers,
                // Optional: inform server that it's an SSR request
                'x-ssr': '1',
                'x-jwt': jwt
              };
            }
            return {};
          },
        }),
      ]
    };
  },
  ssr: true,
});

export const withTRPC = trpc.withTRPC
export type { AppRouter };