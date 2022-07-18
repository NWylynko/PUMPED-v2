
export const inProduction = process.env.NODE_ENV === "production"

const getConfig = () => {

  const domain = inProduction
    ? process.env.DOMAIN
    : 'http://localhost:3000';

  if (!domain) {
    throw new Error(`env DOMAIN is undefined`)
  }

  const dgraph = inProduction
    ? process.env.DGRAPH_API
    : `http://localhost:8080`

  if (!dgraph) {
    throw new Error(`env DGRAPH_API is undefined`)
  }


  const dgraphKey = inProduction
    ? process.env.DGRAPH_API_KEY
    : undefined

  if (!dgraphKey && inProduction) {
    throw new Error(`env DGRAPH_API_KEY is undefined`)
  }

  return {
    domain,
    dgraph,
    dgraphKey
  }
}

const config = getConfig()

export const domain = config.domain;
export const dgraph = config.dgraph;
export const dgraphKey = config.dgraphKey;