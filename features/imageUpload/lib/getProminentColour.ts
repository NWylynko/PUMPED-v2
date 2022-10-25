import getColors from 'get-image-colors';

export const getProminentColour = async (ext: string, image: Buffer) => {
  const colours = await getColors(image, `image/${ext}`);

  // colour one and two are most the time black and white, so the third is perfect
  return colours[2].hex();

};
