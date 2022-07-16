import { getSdkApollo, Requester } from "../../lib/getSdkApollo";
import { client } from "../client";

export const getMethods = <S extends (requester: Requester) => ReturnType<S>,>(getSdk: S) => getSdkApollo(getSdk, client)