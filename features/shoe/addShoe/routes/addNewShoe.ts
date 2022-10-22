import { graphql } from "@/graphql";
import { t } from "@/server/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const requestSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  releaseDate: z.date(),
  public: z.boolean(),
  brandId: z.string(),
  styleId: z.string(),
  sectionId: z.string(),
  collectionId: z.string(),
  coverImageId: z.string(),
  colourIds: z.array(z.string()),
  tagIds: z.array(z.string()),
});

export const addNewShoe = t.procedure
  .input(requestSchema)
  .mutation(async ({ input }) => {
    const result = await graphql.mutation({
      addShoe: [
        {
          input: [
            {
              name: input.name,
              description: input.description,
              price: input.price,
              releaseDate: input.releaseDate,
              public: input.public,
              brand: {
                brandId: input.brandId,
              },
              style: {
                styleId: input.styleId,
              },
              section: {
                sectionId: input.sectionId,
              },
              collection: {
                collectionId: input.collectionId,
              },
              coverImage: {
                imageId: input.coverImageId,
              },
              colours: input.colourIds.map((colourId) => ({
                colourId,
              })),
              tags: input.tagIds.map((tagId) => ({
                tagId,
              })),
            },
          ],
        },
        {
          shoe: {
            shoeId: true,
          },
        },
      ],
    });

    if (!result.addShoe?.shoe) {
      throw new TRPCError({
        message: `database responded without shoe`,
        code: "INTERNAL_SERVER_ERROR"
      })
    }

    const shoe = result.addShoe.shoe[0]

    return shoe;
});
