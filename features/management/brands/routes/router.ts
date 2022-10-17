import { t } from "@/server/trpc";

import { getBrands } from "./getBrands";
import { getBrand } from "./getBrand";
import { createBrand } from "./createBrand";
import { updateBrand } from "./updateBrand";
import { removeBrand } from "./removeBrand";

export const router = t.router({
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  removeBrand,
});
