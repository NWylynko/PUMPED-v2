import { trpc } from "@/lib/trpc";
import type { NextPage } from "next";


export const BrandsList: NextPage = () => {

  const { data: brands } = trpc.brands.getBrands.useQuery();

  console.log({ brands })

  return (
    <></>
  )
}
