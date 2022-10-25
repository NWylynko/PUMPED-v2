import axios from "axios";

interface ColorResponse {
  paletteTitle: string;
}

export const getColourName = async (hex: string) => {
  const hexWithoutHash = hex.replace("#", "");
  const { data } = await axios.get<ColorResponse>(`https://api.color.pizza/v1/${hexWithoutHash}`);

  return data.paletteTitle;
};

