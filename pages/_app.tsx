
import { AppType } from 'next/dist/shared/lib/utils';
import { trpc } from "../lib/trpc";

import Navbar from "../components/navbar";
import { StoreProvider } from "../lib/store";
import "../styles/index.css";

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

export default trpc.withTRPC(MyApp);