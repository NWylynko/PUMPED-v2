import { inProduction } from "./inProduction";


export const getDomain = (): string => {
  const domain = inProduction
    ? process.env.DOMAIN
    : 'http://localhost:3000';

  if (!domain) {
    throw new Error(`env DOMAIN is undefined`);
  }

  return domain;
};
