import { createLoader } from "@/lib/createLoader";
import { t } from "@/server/trpc";
import { z } from "zod";
import { methods } from "./methods.generated";

// by using a loader the requests are more optimised making requests faster
const loaders = {
  getShoeDetails: createLoader(methods.shoeDetails, "shoeIds", "queryShoe"),
  getShoeColourIds: createLoader(methods.shoeColourIds, "shoeIds", "queryShoe"),
  getShoeColour: createLoader(methods.shoeColour, "colourIds", "queryColour")
}

export const router = t.router({



  getShoeIds: t.procedure
    .query(async () => {
      const result = await methods.shoeIds();
      return result.queryShoe;
    }),



  getShoeDetails: t.procedure
    .input(z.object({
      shoeId: z.string()
    }))
    .query(async ({ input }) => {
      return loaders.getShoeDetails.load({ shoeIds: input.shoeId });
    }),



  getShoeColourIds: t.procedure
    .input(z.object({
      shoeId: z.string()
    }))
    .query(async ({ input }) => {
      const result = await loaders.getShoeColourIds.load({ shoeIds: input.shoeId })
      return result?.colours
    }),



  getShoeColour: t.procedure
    .input(z.object({
      colourId: z.string()
    }))
    .query(async ({ input }) => {
      return loaders.getShoeColour.load({ colourIds: input.colourId })
    })



});