import { getDgraphKey } from "@/config/dgraphKey";
import { getDgraph } from "@/config/getDgraph";
import { inProduction } from "@/config/inProduction";
import { createClient } from "@/generated/index";
import type { Headers } from "@genql/runtime/dist/client/createClient";

const headers: Headers = {};

if (inProduction) {
  headers["Dg-Auth"] = getDgraphKey()
}

export const graphql = createClient({
  url: `${getDgraph()}/graphql`,
  headers
})
