import * as trpc from "@trpc/server";
import { z } from "zod";
import { methods } from "./methods";

export const brandRouter = trpc.router()
  .query("getBrands", {
    async resolve() {
      const { queryBrand: result } = await methods.getBrands();
      return result;
    },
  })
  .mutation("createBrand", {
    input: z.object({
      name: z.string()
    }),
    async resolve({ input }) {
      const result = await methods.createBrand({ brand: input });
      return result.addBrand?.brand;
    }
  })
