import { t } from "../trpc";
import { z } from "zod";
import { methods } from "./methods";

export const cartRouter = t.router({
  get: t.procedure
    .input(z.object({
      customerId: z.string()
    }))
    .query(async ({ input: { customerId } }) => {
      const result = await methods.getCart({ customerId })
      return result.queryOrder
    }),
});