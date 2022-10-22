import { TRPCError } from '@trpc/server';
import { graphql } from "@/graphql";
import { t } from "@/server/trpc";
import { z } from "zod";

export const getShoeColourIds = t.procedure
  .input(
    z.object({
      shoeId: z.string(),
    })
  )
  .output(
    z.array(
      z.object({
        colourId: z.string(),
      })
    )
  )
  .query(async ({ input }) => {
    const result = await graphql.query({
      queryShoe: [
        {
          filter: {
            shoeId: [input.shoeId],
            public: true,
          },
        },
        {
          colours: {
            colourId: true,
          },
        },
      ],
    });

    const shoes = result.queryShoe

    if (!shoes) {
      throw new TRPCError({
        message: `shoe not found`,
        code: "NOT_FOUND"
      })
    }

    const shoe = shoes[0];

    if (!shoe) {
      throw new TRPCError({
        message: `shoe not found`,
        code: "NOT_FOUND"
      })
    }

    const { colours } = shoe;

    if (!colours) {
      throw new TRPCError({
        message: `shoe does not contain colours`,
        code: "NOT_FOUND"
      })
    }

    return colours
  });
