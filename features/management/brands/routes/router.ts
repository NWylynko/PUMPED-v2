import { t } from "@/server/trpc";
import { z } from "zod";
import { graphql } from "@/graphql";

export const router = t.router({
  getBrands: t.procedure.query(async () => {
    const result = await graphql.query({
      queryBrand: {
        brandId: true,
        icon: {
          imageId: true,
          name: true,
        },
        name: true,
        website: true,
      },
    });

    const brands = result.queryBrand ?? [];

    console.log({ brands });

    return brands;
  }),

  getBrand: t.procedure
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
    }),

  createBrand: t.procedure
    .input(
      z.array(
        z.object({
          name: z.string(),
          website: z.string().url(),
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

      return result.addBrand?.brand;
    }),

  updateBrand: t.procedure
    .input(
      z.object({
        brandIds: z.array(z.string()),
        patch: z.object({
          name: z.string(),
          website: z.string().url(),
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
            brand: { brandId: true },
          },
        ],
      });

      return result.updateBrand?.brand ?? [];
    }),

  removeBrand: t.procedure
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
      })

      return result.deleteBrand?.brand

    }),
});
