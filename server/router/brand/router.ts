import { t } from "../../trpc";
import { z } from "zod";
import { getMethods } from "./methods";

export const brandRouter = t.router({
  get: t.procedure
    .input(z.object({
      brandId: z.string()
    }))
    .query(async ({ input: { brandId } }) => {
      const { getBrand } = await getMethods()
      const result = await getBrand({ brandId });
      return result.getBrand;
    }),
  create: t.procedure
    .input(z.object({
      name: z.string(),
      website: z.string().nullable()
    }))
    .mutation(async ({ input }) => {
      const { createBrand } = await getMethods()
      const result = await createBrand({ brand: input });
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
      const { updateBrand } = await getMethods()
      const result = await updateBrand({ brandId: input.brandId, change: input.new });
      return result.updateBrand?.brand;
    }),
  remove: t.procedure
    .input(z.object({
      brandId: z.string()
    }))
    .query(async ({ input }) => {
      const { removeBrand } = await getMethods()
      const result = await removeBrand({ brandId: input.brandId });
      return result.deleteBrand;
    }),
})
