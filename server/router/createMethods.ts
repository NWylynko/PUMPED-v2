import { getSdkApollo, Requester } from "../../lib/getSdkApollo";
import { getClient } from "../client";

export const createMethods = async <S extends (requester: Requester) => ReturnType<S>,>(getSdk: S) => {
  const client = await getClient()
  return getSdkApollo(getSdk, client)
}