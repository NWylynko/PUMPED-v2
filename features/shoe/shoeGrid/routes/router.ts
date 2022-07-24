import { t } from "@/server/trpc";
import { z } from "zod";
import { getMethods } from "./methods.generated";

export const router = t.router({
  getShoeIds: t.procedure
    .query(async () => {
      const { shoeIds } = await getMethods()
      const result = await shoeIds();
      return result.queryShoe;
    }),
  getShoeDetails: t.procedure
    .input(z.object({
      shoeId: z.string()
    }))
    .query(async ({ input }) => {
      const { shoeDetails } = await getMethods()
      const result = await shoeDetails({ shoeId: input.shoeId });
      return result.getShoe
    }),
  getShoeColourIds: t.procedure
    .input(z.object({
      shoeId: z.string()
    }))
    .query(async ({ input }) => {
      const { shoeColourIds } = await getMethods();
      const result = await shoeColourIds({ shoeId: input.shoeId });
      return result.getShoe?.colours
    }),
  getShoeColour: t.procedure
    .input(z.object({
      colourId: z.string()
    }))
    .query(async ({ input }) => {
      const { shoeColour } = await getMethods();
      const result = await shoeColour({ colourId: input.colourId });
      return result.getColour
    })
});