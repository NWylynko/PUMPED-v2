'use client';

import "./base.css"
import { Kanit, Fugaz_One } from '@next/font/google';

import { FirebaseProvider } from "@bluesky-digital-labs/next-firebase-auth";

const kanit = Kanit({
  weight: "400",
  variable: "--kanit",
  subsets: ["latin"]
})

const fugazOne = Fugaz_One({
  weight: "400",
  variable: "--fugaz",
  subsets: ["latin"]
})

export default function RootLayout({ children }: { children: JSX.Element }) {
  return (
    <html>
      <body className={[kanit.variable, fugazOne.variable].join(' ')}>
        <FirebaseProvider>
          {children}
        </FirebaseProvider>
      </body>
    </html>
  );
}
