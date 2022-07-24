
import { inProduction } from "../config/inProduction";
import { getDgraphKey } from "../config/dgraphKey";
import { getDgraph } from "../config/getDgraph";

import {
  ApolloClient,
  ApolloClientOptions,
  InMemoryCache,
  NormalizedCacheObject
} from "@apollo/client";

let dgraphClient: ApolloClient<NormalizedCacheObject> | undefined = undefined;

export const getDgraphClient = () => {

  if (dgraphClient) return dgraphClient;

  const dgraph = getDgraph();

  const config: ApolloClientOptions<NormalizedCacheObject> = {
    uri: `${dgraph}/graphql`,
    cache: new InMemoryCache(),
  }

  const dgraphKey = getDgraphKey()

  if (inProduction && dgraphKey) {
    config.headers = {
      "Dg-Auth": dgraphKey
    }
  }

  dgraphClient = new ApolloClient(config);

  return dgraphClient

}