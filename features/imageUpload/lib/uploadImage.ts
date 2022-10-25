import "@/lib/initializeFirebase";
import { getStorage } from 'firebase-admin/storage';

const bucket = getStorage().bucket();

export const uploadImage = (imageId: string, ext: string, image: Buffer) => {

  return bucket
    .file(`images/${imageId}.${ext}`)
    .save(image, { contentType: `image/${ext}` });

  };
