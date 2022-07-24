import { NextSeo } from 'next-seo';
import { Shoes } from '../components/Shoes';

export function HomePage() {

  return (
    <>
      <NextSeo title="Home" />
      <Shoes />
    </>
  );
}
