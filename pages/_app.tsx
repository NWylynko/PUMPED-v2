import { AppType } from "next/dist/shared/lib/utils";
import { withTRPC } from "../lib/trpc";

import Navbar from "../components/navbar";

// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { FirebaseProvider, useFirebase } from "@bluesky-digital-labs/next-firebase-auth";
import { Login } from "../components/Login";

import { createGlobalStyle, ThemeProvider } from "styled-components";
import { NextSeo } from "next-seo";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    background-color: #141111;
  }

  p, b, h2, h3, h4, h5, h6, a, li, button, label, select, option {
    margin: 0;
    color: rgb(241, 239, 239);

    font-family: allumi-std,sans-serif;
    font-weight: 400;
    font-style: normal;

  }

  button, input {
    margin: 8px;
    padding: 12px;

    min-width: 150px;
    max-height: 75px;

    background-color: #f04141;
    color: white;

    border: none;

  }

  button:hover {
    background-color: #f36868;
  }
`;

const MyApp: AppType = ({ Component, pageProps }) => {
  const { loading, user } = useFirebase();

  if (!loading && !user) {
    return <Login />;
  }

  // @ts-ignore
  const navBarLarge = !Component.smallNavBar as boolean;
  // @ts-ignore
  const hideNavItems = Component.hideNavItems as boolean;

  return (
    <>
      <Navbar large={navBarLarge} hideNavItems={hideNavItems} />
      <Component {...pageProps} />
      {/* <ReactQueryDevtools /> */}
    </>
  );
};

const App: AppType = (props) => {
  return (
    <>
      <GlobalStyle />
      <NextSeo titleTemplate="%s - PUMPED 👟" />
      <ThemeProvider theme={{}}>
        <FirebaseProvider>
          <MyApp {...props} />
        </FirebaseProvider>
      </ThemeProvider>
    </>
  );
};

export default withTRPC(App);
