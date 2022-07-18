import { inProduction } from "./inProduction";
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

export let client: SecretManagerServiceClient | undefined = undefined;

if (inProduction) {
  client = new SecretManagerServiceClient();
}

let dgraphKey: string | undefined = undefined;

export const getDgraphKey = async (): Promise<string | undefined> => {
  if (!inProduction)
    return undefined;

  if (dgraphKey)
    return dgraphKey;

  if (!client) {
    throw new Error(`secret manager not instantiated`);
  }

  const [version] = await client.accessSecretVersion({
    name: "projects/545027604759/secrets/DGRAPH_API_KEY/versions/1",
  });

  const payload = version?.payload?.data?.toString();

  dgraphKey = payload;

  return payload;
};
