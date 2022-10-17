import { t } from "@/server/trpc";
import { z } from "zod";
import { graphql } from "@/graphql";

export const getBrand = t.procedure
  .input(
    z.object({
      brandId: z.string(),
    })
  )
  .query(async ({ input: { brandId } }) => {
    const result = await graphql.query({
      getBrand: [
        { brandId },
        {
          brandId: true,
          name: true,
          website: true,
          icon: {
            imageId: true,
            name: true,
          },
        },
      ],
    });

    return result.getBrand;
  });
