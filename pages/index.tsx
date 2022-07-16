import React from 'react';
import { Shoes } from '@/components/Shoes'
import { Loading } from '@/components/loading';
import { ShoeWithColours } from '@/PUMPED-api/api/shoe/types';

function Home() {

  // const { isLoading, error, data = [] } = useQuery("shoes", getShoes);

  const isLoading = false;
  const error = undefined;
  const data = [] as ShoeWithColours[];

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <p>error</p>
  }

  return (
    <Shoes data={data} />
  );
}

export default Home;
