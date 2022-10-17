import { createLoader } from "@/lib/createLoader";
import { t } from "@/server/trpc";
import { z } from "zod";
import { methods } from "./methods.generated";

// by using a loader the requests are more optimised making requests faster
const loaders = {
  addNewShoe: createLoader(methods.addNewShoe, "shoes", "addShoe"),
}

export const router = t.router({

  addNewShoe: t.procedure
    .input(z.object({
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
    }))
    .mutation(async ({ input }) => {
      return loaders.addNewShoe.load({ shoes: {
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
        colours: input.colourIds.map(colourId => ({
          colourId,
        })),
        tags: input.tagIds.map(tagId => ({
          tagId,
        })),
      }
    });
  }),

  getBrands: t.procedure
    .query(async () => {
      const result = await methods.getBrands();
      return result.queryBrand ?? []
    })

});