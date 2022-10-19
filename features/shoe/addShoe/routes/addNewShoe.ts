import { graphql } from "@/graphql";
import { t } from "@/server/trpc";
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

const responseSchema = z.array(z.object({
  shoeId: z.string()
}));

export const addNewShoe = t.procedure
  .input(requestSchema)
  .mutation(async ({ input }) => {
    const response = await graphql.mutation({
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

    const result = await responseSchema.parseAsync(response.addShoe?.shoe)

    return result[0];
});
