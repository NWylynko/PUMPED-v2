
import { inProduction } from "../config/inProduction";
import { getDgraphKey } from "../config/dgraphKey";
import { getDgraph } from "../config/getDgraph";

import {
  ApolloClient,
  ApolloClientOptions,
  InMemoryCache,
  NormalizedCacheObject
} from "@apollo/client";

let client: ApolloClient<NormalizedCacheObject> | undefined = undefined;

export const getClient = async () => {

  if (client) return client;

  const dgraph = getDgraph();

  const config: ApolloClientOptions<NormalizedCacheObject> = {
    uri: `${dgraph}/graphql`,
    cache: new InMemoryCache(),
  }

  const dgraphKey = await getDgraphKey()

  if (inProduction && dgraphKey) {
    config.headers = {
      "Dg-Auth": dgraphKey
    }
  }

  client = new ApolloClient(config);

  return client

}