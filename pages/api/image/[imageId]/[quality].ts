/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next'
import "../../../../lib/initializeFirebase";
import { getStorage } from 'firebase-admin/storage';
import { z } from "zod"

const bucket = getStorage().bucket()

const schema = z.object({
  imageId: z.string(),
  quality: z.union([
    z.literal("low"),
    z.literal("medium"),
    z.literal("high"),
  ]),
})

const sizes = {
  low: "200x200",
  medium: "400x400",
  high: "600x600"
}

const imageCache = new Map<string, Buffer>()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { imageId, quality } = await schema.parseAsync(req.query);

  const size = sizes[quality]

  const location = `images/${imageId}_${size}.jpeg`

  const cachedImage = imageCache.get(location)

  if (cachedImage) {
    res
      .status(200)
      .setHeader("Cache-Control", "public max-age=86400")
      .send(cachedImage)
    return;
  }

  const [image] = await bucket.file(location).download()

  imageCache.set(location, image);

  res
    .status(200)
    .setHeader("Cache-Control", "public max-age=86400")
    .send(image)
}