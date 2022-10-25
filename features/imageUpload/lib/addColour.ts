import { graphql } from "@/graphql";

export async function addColour(shoeId: string, imageId: string, hex: string, colourName: string) {

  const result = await graphql.mutation({
    addColour: [
      {
        input: [
          {
            shoe: {
              shoeId
            },
            image: {
              imageId,
            },
            hex,
            name: colourName
          }
        ]
      }, {
        colour: {
          name: true,
          hex: true
        }
      }
    ]
  });

  const [colour] = result.addColour?.colour ?? [];
  if (!colour)
    throw new Error(`failed to add colour to image`);
  return colour;
}
