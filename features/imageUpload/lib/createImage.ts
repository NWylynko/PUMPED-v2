import { graphql } from "@/graphql";

export const createImage = async (name: string) => {

  const { addImage } = await graphql.mutation({
    addImage: [
      {
        input: [
          {
            name
          }
        ]
      },
      {
        image: {
          imageId: true,
          name: true
        }
      }
    ]
  });

  const [newImage] = addImage?.image ?? [];
  const imageId = newImage?.imageId;

  if (!imageId) {
    throw new Error(`failed to create image in database`);
  }

  return { imageId };
};
