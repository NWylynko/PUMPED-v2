import { z } from "zod";

const schema = z.string().url();

export const getDgraph = (): string => {
  return schema.parse(process.env.DGRAPH_API);
};
