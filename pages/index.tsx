import React from 'react';
import { Shoes } from '../components/Shoes'
import { Loading } from '../components/loading';
import { ShoeWithColours } from '../PUMPED-api/api/shoe/types';
import { trpc } from "../lib/trpc";
import { NextSeo } from 'next-seo';

function Home() {

  const { data: customer } = trpc.customer.get.useQuery();

  // const { mutateAsync } = trpc.image.add.useMutation()

  // const test = async () => {
  //   await mutateAsync({
  //     shoeId: "0x3",
  //     name: "air-force",
  //     url: "https://static.nike.com/a/images/c_limit,w_318,f_auto/t_product_v1/341e2ed9-9797-4f15-8d4f-265071377068/air-force-1-07-lv8-shoes-7j2wDJ.png"
  //   })
  //   await mutateAsync({
  //     shoeId: "0x6",
  //     name: "air-jordan-1",
  //     url: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/b2e019af-89f3-46bc-a888-b34716647534/air-jordan-1-elevate-low-se-shoes-8rrb36.png"
  //   })
  // }

  // return (
  //   <button onClick={test}>Click me</button>
  // )

  return (
    <>
      <NextSeo title="Home" />
      <Shoes />
    </>
  );
}

export default Home;