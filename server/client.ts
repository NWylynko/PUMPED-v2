
import { dgraph } from "../config"

import {
  ApolloClient, InMemoryCache
} from "@apollo/client";

export const client = new ApolloClient({
  uri: `${dgraph}/graphql`,
  cache: new InMemoryCache(),
});