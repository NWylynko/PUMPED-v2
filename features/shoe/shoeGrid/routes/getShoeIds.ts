import { graphql } from "@/graphql";
import { t } from "@/server/trpc";

export const getShoeIds = t.procedure.query(async () => {

  const result = await graphql.query({
    queryShoe: [
      {
        filter: {
          public: true,
        },
      },
      {
        shoeId: true
      },
    ],
  });

  return result.queryShoe;

});
