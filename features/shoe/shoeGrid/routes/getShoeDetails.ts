import { graphql } from "@/graphql";
import { t } from "@/server/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const getShoeDetails = t.procedure
  .input(
    z.object({
      shoeId: z.string(),
    })
  )
  .query(async ({ input }) => {
    const result = await graphql.query({
      queryShoe: [
        {
          filter: {
            shoeId: [input.shoeId],
            public: true,
          }
        }, {
          shoeId: true,
          name: true,
          brand: {
            brandId: true,
            name: true,
            icon: {
              imageId: true,
              name: true
            }
          },
          stars: true,
          price: true,
          coverImage: {
            imageId: true
          },
          colours: {
            name: true,
            hex: true,
            image: {
              imageId: true,
              name: true
            }
          }
        }
      ]
    });

    if (!result.queryShoe) {
      throw new TRPCError({
        message: `404 shoe not found`,
        code: "NOT_FOUND"
      });
    }

    const shoe = result.queryShoe[0];

    if (!shoe) {
      throw new TRPCError({
        message: `404 shoe not found`,
        code: "NOT_FOUND"
      });
    }

    return shoe;
  });
