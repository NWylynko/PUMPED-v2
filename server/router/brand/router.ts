import { t } from "../trpc";
import { z } from "zod";
import { methods } from "./methods";

export const brandRouter = t.router({
  get: t.procedure
    .input(z.object({
      brandId: z.string()
    }))
    .query(async ({ input: { brandId } }) => {
      const result = await methods.getBrand({ brandId });
      return result.getBrand;
    }),
  create: t.procedure
    .input(z.object({
      name: z.string(),
      website: z.string().nullable()
    }))
    .mutation(async ({ input }) => {
      const result = await methods.createBrand({ brand: input });
      return result.addBrand?.brand;
    }),
  update: t.procedure
    .input(z.object({
      brandId: z.string(),
      new: z.object({
        name: z.string(),
        website: z.string().nullable()
      })
    }))
    .mutation(async ({ input }) => {
      const result = await methods.updateBrand({ brandId: input.brandId, change: input.new });
      return result.updateBrand?.brand;
    }),
  remove: t.procedure
    .input(z.object({
      brandId: z.string()
    }))
    .query(async ({ input }) => {
      const result = await methods.removeBrand({ brandId: input.brandId });
      return result.deleteBrand;
    }),
})
