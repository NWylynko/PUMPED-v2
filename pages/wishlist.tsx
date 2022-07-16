import React, { useContext, useState, useEffect } from "react";
import StoreContext from "@/lib/store";
import styled from "styled-components";
import { clearWishlist, getWishlist, getShoe } from "@/lib/api";
import { Loading } from "@/components/loading";
import Link from "next/link";
import { Stars } from "@/components/Stars";
import { ShoeWithDetails } from "@/PUMPED-api/api/shoe/types";

export const CheckCustomerID = () => {
  const { customer } = useContext(StoreContext);

  if (!customer) {
    return (
      <Page>
        <h2>Wishlist</h2>
        <p>no customer id</p>
      </Page>
    );
  }

  return <Wishlist />;
};

interface Props { }

const Wishlist = (props: Props): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState<{ ShoeID: number; }[]>();
  const [reFetch, setReFetch] = useState(false)

  useEffect(() => {
    const run = async () => {
      try {
        const wishlist = await getWishlist();
        setData(wishlist);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    run();
  }, [reFetch]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>error</p>;
  }

  if (data?.length === 0 || !data) {
    return (
      <Page>
        <h2>Wishlist</h2>
        <p>Your Wishlist is empty</p>
      </Page>
    );
  }

  return (
    <Page>
      <h2>Wishlist</h2>
      <Shoes data={data} />
      <ButtonContainer>
        <button onClick={async () => { await clearWishlist(); setReFetch(state => !state) }}>Clear Wishlist</button>
      </ButtonContainer>
    </Page>
  );
};

export default Wishlist;

const Page = styled.div`
  min-height: calc(101vh - 300px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonContainer = styled.div`
  /* align-items: center; */
`;

const Shoes = ({ data }: { data: { ShoeID: number; }[] }) => {
  return <>{data.map(Shoe)}</>;
};

const Shoe = ({ ShoeID }: { ShoeID: number; }) => {
  // const { isLoading, error, data } = useQuery(`shoe ${ShoeID}`, () => getShoe(ShoeID));

  const isLoading = false;
  const error = undefined;
  const data = {} as ShoeWithDetails;

  if (isLoading) {
    return <Loading key={ShoeID} />;
  }

  if (error) {
    return <p key={ShoeID}>error</p>;
  }

  if (!data) {
    return <p key={ShoeID}>shoe doesnt exist</p>;
  }

  return (
    <Container key={ShoeID}>
      <SmallImage src={`/image/${data.CoverImage}/low`} />
      <NameLink href={`/shoe/${ShoeID}`}>
        <Name>{data.Name}</Name>
      </NameLink>
      <Stars n={data.Stars} white />
      <p>${data.Price}</p>
    </Container>
  );
};

const Container = styled.div`
  display: inline-flex;
  width: 700px;
  justify-content: space-between;
  text-decoration: none;
  align-items: center;
`;

const SmallImage = styled.img`
  height: 60px;
  width: 60px;

  object-fit: cover;

  padding: 2px;
  margin: 2px;
`;

const Name = styled.h3`
  min-width: 400px;
`;

const NameLink = styled(Link)`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
