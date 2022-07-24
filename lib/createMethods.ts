import { getSdkApollo, Requester } from "@/lib/getSdkApollo";
import { getDgraphClient } from "@/lib/dgraphClient";

export const createMethods = async <S extends (requester: Requester) => ReturnType<S>,>(getSdk: S) => {
  const client = await getDgraphClient()
  return getSdkApollo(getSdk, client)
}