import { graphql } from "@/graphql";
import { t } from "@/server/trpc";
import { z } from "zod";

export const getShoeColour = t.procedure
  .input(
    z.object({
      colourId: z.string(),
    })
  )
  .query(async ({ input }) => {
    const { queryColour } = await graphql.query({
      queryColour: [
        {
          filter: {
            colourId: [input.colourId]
          }
        },
        {
          name: true,
          hex: true,
          image: {
            imageId: true
          }
        }
      ]
    });
  });
