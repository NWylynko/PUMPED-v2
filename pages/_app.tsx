
import { withTRPC } from '@trpc/next';
import { AppType } from 'next/dist/shared/lib/utils';
import { AppRouter } from './api/trpc/[trpc]';

import "../styles/index.css";
import { StoreProvider } from "../lib/store";
import Navbar from "../components/navbar";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <StoreProvider>
        <Navbar />
        <Component {...pageProps} />
      </StoreProvider>
    </>
  );
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env.NODE_ENV === "production"
      ? `http://localhost:3000/api/trpc` // need domain here (either directly or from env)
      : 'http://localhost:3000/api/trpc';

    return {
      url,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(MyApp);