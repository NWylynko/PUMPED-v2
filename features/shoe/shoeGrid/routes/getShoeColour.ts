import { graphql } from "@/graphql";
import { t } from "@/server/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const getShoeColour = t.procedure
  .input(
    z.object({
      colourId: z.string(),
    })
  )
  .output(
    z.object({
      name: z.string(),
      hex: z.string(),
      image: z.object({
        imageId: z.string()
      })
    })
  )
  .query(async ({ input }) => {
    const result = await graphql.query({
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

    const colours = result.queryColour

    if (!colours) {
      throw new TRPCError({
        message: `shoe not found`,
        code: "NOT_FOUND"
      })
    }

    const colour = colours[0];

    if (!colour) {
      throw new TRPCError({
        message: `shoe not found`,
        code: "NOT_FOUND"
      })
    }

    return colour
  });
