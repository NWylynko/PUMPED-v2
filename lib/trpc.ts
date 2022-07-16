import { setupTRPC } from '@trpc/next';
import type { AppRouter } from '../pages/api/trpc/[trpc]';


const t = setupTRPC<AppRouter>({
  config({ ctx }) {
    if (typeof window !== 'undefined') {
      // during client requests
      return {
        url: '/api/trpc',
      };
    }
    // during SSR below

    // optional: use SSG-caching for each rendered page (see caching section for more details)
    const ONE_DAY_SECONDS = 60 * 60 * 24;
    ctx?.res?.setHeader(
      'Cache-Control',
      `s-maxage=1, stale-while-revalidate=${ONE_DAY_SECONDS}`,
    );

    const url = process.env.NODE_ENV === "production"
      ? `http://localhost:3000/api/trpc` // need domain here (either directly or from env)
      : 'http://localhost:3000/api/trpc';

    return {
      url,
      headers: {
        // optional - inform server that it's an ssr request
        'x-ssr': '1',
      },
    };
  },
  ssr: true,
});

export const withTRPC = t.withTRPC
export const trpc = t.proxy;