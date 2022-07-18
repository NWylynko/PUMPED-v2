import { t } from "../trpc";
import { z } from "zod";
import { getMethods } from "./methods";
import "../../../lib/initializeFirebase";
import { getStorage } from 'firebase-admin/storage';
import axios from "axios"
import getColors from 'get-image-colors';

const bucket = getStorage().bucket()

const downloadImage = async (url: string) => {
  const response = await axios.get(url, {
    responseType: 'arraybuffer'
  })
  const image = Buffer.from(response.data, 'binary')
  const [type, ext] = response.headers['content-type'].split("/")

  if (type !== "image") {
    throw new Error(`upload is not an image`)
  }

  return { image, ext }
}

const createImage = async (name: string) => {
  const { createImage } = await getMethods()
  const { addImage } = await createImage({
    image: {
      name,
    }
  })

  const [newImage] = addImage?.image ?? []
  const imageId = newImage?.imageId

  if (!imageId) {
    throw new Error(`failed to create image in database`)
  }

  return { imageId }
}

const uploadImage = (imageId: string, ext: string, image: Buffer) => {
  return bucket
    .file(`images/${imageId}.${ext}`)
    .save(image, { contentType: `image/${ext}` })
}

const getProminentColour = async (ext: string, image: Buffer) => {
  const colours = await getColors(image, `image/${ext}`)

  // colour one and two are most the time black and white, so the third is perfect
  return colours[2].hex()

}

interface ColorResponse {
  paletteTitle: string;
}

const getColourName = async (hex: string) => {
  const hexWithoutHash = hex.replace("#", "")
  const { data } = await axios.get<ColorResponse>(`https://api.color.pizza/v1/${hexWithoutHash}`);

  return data.paletteTitle;
}

async function addColour(shoeId: string, imageId: string, hex: string, colourName: string) {
  const { addColour } = await getMethods()
  const result = await addColour({ newColour: { shoe: { shoeId }, image: { imageId }, hex, name: colourName } });
  const [colour] = result.addColour?.colour ?? []
  if (!colour) throw new Error(`failed to add colour to image`)
  return colour
}

export const imageRouter = t.router({
  add: t.procedure
    .input(z.object({
      shoeId: z.string(),
      name: z.string(),
      url: z.string().url()
    }))
    .mutation(async ({ input: { shoeId, name, url } }) => {

      const { image, ext } = await downloadImage(url);
      const { imageId } = await createImage(name);
      await uploadImage(imageId, ext, image)
      const hex = await getProminentColour(ext, image)
      const colourName = await getColourName(hex);
      const colour = await addColour(shoeId, imageId, hex, colourName)

      return { name, imageId, colour }

    })
});


