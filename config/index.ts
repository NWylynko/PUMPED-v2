
const inProduction = process.env.NODE_ENV === "production"

export const domain = inProduction
  ? process.env.DOMAIN
  : 'http://localhost:3000';

export const dgraph = inProduction
  ? process.env.DGRAPH_API
  : `http://localhost:8080`