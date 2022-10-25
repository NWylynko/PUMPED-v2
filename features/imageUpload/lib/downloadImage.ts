import axios from "axios";

export const downloadImage = async (url: string) => {
  const response = await axios.get(url, {
    responseType: 'arraybuffer'
  });
  const image = Buffer.from(response.data, 'binary');
  const [type, ext] = response.headers['content-type'].split("/");

  if (type !== "image") {
    throw new Error(`upload is not an image`);
  }

  return { image, ext };
};
