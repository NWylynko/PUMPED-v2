import "../styles/index.css";
import { StoreProvider } from "../lib/store";
import Navbar from "../components/navbar";
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Navbar />
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
