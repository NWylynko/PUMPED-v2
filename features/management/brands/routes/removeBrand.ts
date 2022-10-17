import { t } from "@/server/trpc";
import { z } from "zod";
import { graphql } from "@/graphql";

export const removeBrand = t.procedure
  .input(
    z.object({
      brandIds: z.array(z.string()),
    })
  )
  .mutation(async ({ input: { brandIds } }) => {

    const result = await graphql.mutation({
      deleteBrand: [
        { filter: { brandId: brandIds } },
        {
          brand: {
            brandId: true
          }
        }
      ]
    });

    return result.deleteBrand?.brand ?? []

  });
