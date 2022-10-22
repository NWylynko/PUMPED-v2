import type { NextPage } from "next";

export type Page = NextPage & {
  smallNavBar?: boolean;
  hideNavItems?: boolean;
};
