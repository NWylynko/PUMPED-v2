import { inProduction } from "./inProduction";
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

let dgraphKey: string | undefined = undefined;

export const getDgraphKey = (): string => {
  if (!inProduction) {
    throw new Error(`not running production, api key not needed`);
  }

  if (dgraphKey)
    return dgraphKey;

  throw new Error(`the dgraph api key has not loaded yet`);
};

const fetchDgraphKey = async () => {
  if (!inProduction)
    return;


  if (dgraphKey)
    return;

  const client = new SecretManagerServiceClient();

  const [version] = await client.accessSecretVersion({
    name: "projects/545027604759/secrets/DGRAPH_API_KEY/versions/1",
  });

  const payload = version?.payload?.data?.toString();

  dgraphKey = payload;

  return;
}

// a dirty ugly hideous side-effect
// but I don't know a better solution arghhh
fetchDgraphKey();
