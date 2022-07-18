import { t } from "../trpc";
import { z } from "zod";
import { methods } from "./methods";

export const customerRouter = t.router({
  get: t.procedure
    .query(async ({ ctx: { user } }) => {
      const { getCustomer: customer } = await methods.getCustomer({ customerId: user.uid })

      if (!customer) {

        // upload picture url to get id to pass in here

        if (!user.email) {
          throw new Error(`user doesn't have an email`);
        }

        const result = await methods.createCustomer({
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