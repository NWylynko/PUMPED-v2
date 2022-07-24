import React from 'react';
import { Shoes } from '../components/Shoes'
import { trpc } from "@/lib/trpc";
import { NextSeo } from 'next-seo';

export function HomePage() {

  const { data: customer } = trpc.customer.get.useQuery();

  console.log(customer)

  return (
    <>
      <NextSeo title="Home" />
      <Shoes />
    </>
  );
}
