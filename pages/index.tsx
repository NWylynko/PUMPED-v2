import React from 'react';
import { Shoes } from '../components/Shoes'
import { Loading } from '../components/loading';
import { ShoeWithColours } from '../PUMPED-api/api/shoe/types';
import { trpc } from "../lib/trpc";

function Home() {

  // const { isLoading, error, data = [] } = useQuery("shoes", getShoes);

  // const isLoading = false;
  // const error = undefined;
  // const data = [] as ShoeWithColours[];

  const { data } = trpc.brand.get.useQuery({ brandId: "0xf" })

  return <pre>{JSON.stringify(data, null, 2)}</pre>;

  // if (isLoading) {
  //   return <Loading />
  // }

  // if (error) {
  //   return <p>error</p>
  // }

  // return (
  //   <Shoes data={data} />
  // );
}

export default Home;