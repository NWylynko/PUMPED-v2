import { t } from "@/server/trpc";
import { z } from "zod";
import { graphql } from "@/graphql";

export const createBrand = t.procedure
  .input(
    z.array(
      z.object({
        name: z.string(),
        website: z.string().url().optional(),
      })
    )
  )
  .mutation(async ({ input }) => {
    const result = await graphql.mutation({
      addBrand: [
        {
          input: input.map((brand) => ({
            name: brand.name,
            website: brand.website,
            icon: {
              name: `${brand.name} Icon`,
            },
          })),
        },
        {
          brand: {
            brandId: true,
          },
        },
      ],
    });

    return result.addBrand?.brand ?? []
  });
