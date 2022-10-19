import { z } from "zod";

const schema = z.string().url();

export const getDomain = (): string => {
  return schema.parse(process.env.DOMAIN);
};
