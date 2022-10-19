import { t } from "@/server/trpc";

import { addNewShoe } from "./addNewShoe";
import { getBrands } from "@/features/management/brands/routes/getBrands";

export const router = t.router({
  addNewShoe,
  getBrands,
});
