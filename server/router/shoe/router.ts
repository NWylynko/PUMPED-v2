import { t } from "../trpc";
import { z } from "zod";
import { methods } from "./methods";

export const shoeRouter = t.router({
  getAll: t.procedure
    .query(async () => {
      const result = await methods.ShoesJustIds();
      return result.queryShoe;
    }),
  getLightDetails: t.procedure
    .input(z.object({
      shoeId: z.string()
    }))
    .query(async ({ input }) => {
      const result = await methods.ShoeLightDetails({ shoeId: input.shoeId });
      return result.getShoe
    })
});