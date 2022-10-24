// here we locally export the trpc router for this feature

import { AppRouter, trpc as t } from "@/lib/trpc";

export const trpc = t.shoeGrid;
export type Router = AppRouter["shoeGrid"]