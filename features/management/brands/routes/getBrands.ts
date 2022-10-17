import { t } from "@/server/trpc";
import { graphql } from "@/graphql";

export const getBrands = t.procedure.query(async () => {
  const result = await graphql.query({
    queryBrand: {
      brandId: true,
      icon: {
        imageId: true,
        name: true,
      },
      name: true,
      website: true,
    },
  });

  return result.queryBrand ?? [];
});
