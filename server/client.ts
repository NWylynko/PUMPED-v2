
import { dgraph, dgraphKey, inProduction } from "../config"

import {
  ApolloClient, InMemoryCache, NormalizedCacheObject, ApolloClientOptions
} from "@apollo/client";


const config: ApolloClientOptions<NormalizedCacheObject> = {
  uri: `${dgraph}/graphql`,
  cache: new InMemoryCache(),
}

if (inProduction && dgraphKey) {
  config.headers = {
    "Dg-Auth": dgraphKey
  }
}

export const client = new ApolloClient(config);