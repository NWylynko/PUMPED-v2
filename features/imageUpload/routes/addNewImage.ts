import { t } from "@/server/trpc";
import { z } from "zod";

import { downloadImage } from "../lib/downloadImage";
import { createImage } from "../lib/createImage";
import { uploadImage } from "../lib/uploadImage";
import { getProminentColour } from "../lib/getProminentColour";
import { getColourName } from "../lib/getColourName";
import { addColour } from "../lib/addColour";

export const addNewImage = t.procedure
  .input(z.object({
    shoeId: z.string(),
    name: z.string(),
    url: z.string().url()
  }))
  .mutation(async ({ input: { shoeId, name, url } }) => {

    const { image, ext } = await downloadImage(url);
    const { imageId } = await createImage(name);
    await uploadImage(imageId, ext, image);
    const hex = await getProminentColour(ext, image);
    const colourName = await getColourName(hex);
    const colour = await addColour(shoeId, imageId, hex, colourName);

    return { name, imageId, colour };

  });
