import DataLoader from "dataloader";

// https://stackoverflow.com/a/57447842
type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;


type DefaultFetcher<Response = object> = (input: any) => Promise<Response>;

export const createLoader = <
  Fetcher extends DefaultFetcher,
  Request extends Parameters<Fetcher>[0],
  Response extends Awaited<ReturnType<Fetcher>>,
  Id extends keyof Request,
  Filter extends keyof Response
>(fetch: Fetcher, id: Id, filter: Filter) => {

  type Result = ArrayElement<Response[typeof filter]>;

  const loader = new DataLoader<Request, Result>(async (_keys) => {

    const keys = _keys.map(obj => obj[id]);

    const options = { [id]: keys };

    const response = await fetch(options) as Response;

    const result = response[filter];

    if (Array.isArray(result)) {
      return result;
    }

    throw new Error(`response is not an array, failed to load`);

  });

  return loader;
};

