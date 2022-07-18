import { t } from "../trpc";
import { z } from "zod";
import { getMethods } from "./methods";

export const shoeRouter = t.router({
  getAll: t.procedure
    .query(async () => {
      const { ShoesJustIds } = await getMethods()
      const result = await ShoesJustIds();
      return result.queryShoe;
    }),
  getLightDetails: t.procedure
    .input(z.object({
      shoeId: z.string()
    }))
    .query(async ({ input }) => {
      const { ShoeLightDetails } = await getMethods()
      const result = await ShoeLightDetails({ shoeId: input.shoeId });
      return result.getShoe
    })
});