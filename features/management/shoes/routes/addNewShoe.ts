import {graphql} from "@/graphql";
import {t} from "@/server/trpc";
import {TRPCError} from "@trpc/server";
import {z} from "zod";

const select = z.object({
    label: z.string().optional(), // the current implementation passes this through but we don't need it
    value: z.string() // the brand Id
})

const requestSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    releaseDate: z.date(),
    public: z.boolean(),
    brand: select,
    style: select,
    section: select,
    collection: select,
    coverImageId: z.string(),
    colourIds: z.array(z.string()),
    tagIds: z.array(z.string()),
});

export const addNewShoe = t.procedure
    .input(requestSchema)
    .mutation(async ({input}) => {
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
                                brandId: input.brand.value,
                            },
                            style: {
                                styleId: input.style.value,
                            },
                            section: {
                                sectionId: input.section.value,
                            },
                            collection: {
                                collectionId: input.collection.value,
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
