import { t } from "@/server/trpc";
import { z } from "zod";
import { graphql } from "@/graphql";

export const updateBrand = t.procedure
  .input(
    z.object({
      brandIds: z.array(z.string()),
      patch: z.object({
        name: z.string(),
        website: z.string().url().optional(),
      }),
    })
  )
  .mutation(async ({ input: { brandIds, patch } }) => {
    const result = await graphql.mutation({
      updateBrand: [
        {
          input: {
            filter: { brandId: brandIds },
            set: {
              name: patch.name,
              website: patch.website,
              icon: {
                name: `${patch.name} Icon`,
              },
            },
          },
        },
        {
          brand: { 
            brandId: true,
           },
        },
      ],
    });

    return result.updateBrand?.brand ?? [];
  });
