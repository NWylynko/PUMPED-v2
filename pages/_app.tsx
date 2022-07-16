
import { AppType } from 'next/dist/shared/lib/utils';
import { withTRPC } from "../lib/trpc";

import Navbar from "../components/navbar";
import { StoreProvider } from "../lib/store";
import "../styles/index.css";

import { ReactQueryDevtools } from 'react-query/devtools';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <StoreProvider>
        <Navbar />
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </StoreProvider>
    </>
  );
}

export default withTRPC(MyApp);