import { t } from "../trpc";
import { z } from "zod";
import { methods } from "./methods";

export const brandRouter = t.router({
  getAll: t.procedure.query(async () => {
    const { queryBrand: result } = await methods.getBrands();
    console.log(result);
    return result;
  }),
  create: t.procedure
    .input(z.object({
      name: z.string()
    })).mutation(async ({ input }) => {
      const result = await methods.createBrand({ brand: input });
      return result.addBrand?.brand;
    })
})
