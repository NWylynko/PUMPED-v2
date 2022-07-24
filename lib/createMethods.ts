import { getSdkApollo, Requester } from "@/lib/getSdkApollo";
import { getDgraphClient } from "@/lib/dgraphClient";

export const createMethods = <S extends (requester: Requester) => ReturnType<S>,>(getSdk: S) => {
  const client = getDgraphClient()
  return getSdkApollo(getSdk, client)
}