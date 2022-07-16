import { getSdkApollo } from "../../../lib/getSdkApollo";
import { client } from "../../client";
import { getSdk } from "./methods.generated"

export const methods = getSdkApollo(getSdk, client);