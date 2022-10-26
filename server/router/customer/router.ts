import { t } from "@/server/trpc";
import { z } from "zod";
import { getMethods } from "./methods";

export const customerRouter = t.router({
  get: t.procedure
    .query(async ({ ctx }) => {
      const user = await ctx.getUser()
      const { getCustomer, createCustomer } = await getMethods()
      const response = await getCustomer({ customerId: user.uid })

      const { getCustomer: customer } = response;

      if (!customer) {

        if (!user.email) {
          throw new Error(`user doesn't have an email`);
        }

        const result = await createCustomer({
          customer: {
            customerId: user.uid,
            name: user.name,
            email: user.email,
            picture: user.picture
          }
        })

        if (result.addCustomer?.customer) {
          return result.addCustomer?.customer[0]
        }

        throw new Error(`failed to create customer`)

      }

      return customer;
    }),
});