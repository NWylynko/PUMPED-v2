import { inProduction } from "./inProduction";


export const getDgraph = (): string => {
  const dgraph = inProduction
    ? process.env.DGRAPH_API
    : `http://localhost:8080`;

  if (!dgraph) {
    throw new Error(`env DGRAPH_API is undefined`);
  }

  return dgraph;
};
