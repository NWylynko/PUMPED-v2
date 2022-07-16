import "../styles/index.css";
import { StoreProvider } from "@/lib/store";
import Navbar from "@/components/navbar";

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Navbar />
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
