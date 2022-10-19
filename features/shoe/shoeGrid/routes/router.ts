import { t } from "@/server/trpc";

import { getShoeColour } from "./getShoeColour";
import { getShoeColourIds } from "./getShoeColourIds";
import { getShoeDetails } from "./getShoeDetails";
import { getShoeIds } from "./getShoeIds";

export const router = t.router({
  getShoeIds,
  getShoeDetails,
  getShoeColourIds,
  getShoeColour
});
