import { graphql } from "@/graphql";
import { t } from "@/server/trpc";
import { z } from "zod";

export const getShoeColourIds = t.procedure
  .input(
    z.object({
      shoeId: z.string(),
    })
  )
  .query(async ({ input }) => {
    const { queryShoe } = await graphql.query({
      queryShoe: [
        {
          filter: {
            shoeId: [input.shoeId],
            public: true
          }
        },
        {
          colours: {
            colourId: true
          }
        }
      ]
    });
    return queryShoe;
  });
