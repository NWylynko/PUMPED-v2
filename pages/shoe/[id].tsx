import React, { useEffect, useContext, useState } from "react";
import { useRouter } from 'next/router'
import { addToCart, getShoe, addToWishlist, removeFromWishlist, isInWishlist } from "@/lib/api";
import type { ShoeWithDetails as ShoeProps } from "@/PUMPED-api/api/shoe/types";
import styled from "styled-components";
import { Stars } from "@/components/Stars";
import { Images } from "@/components/Images";
import { AiFillStar } from "@react-icons/all-files/ai/AiFillStar";
import { AiOutlineStar } from "@react-icons/all-files/ai/AiOutlineStar";

import Reviews from "@/components/reviews";
import StoreContext from "@/lib/store";
import { Loading } from "@/components/loading";
import { TiTickOutline } from "@react-icons/all-files/ti/TiTickOutline";
import { TiTimesOutline } from "@react-icons/all-files/ti/TiTimesOutline";

function ShoePage() {
  const router = useRouter();
  const { id } = router.query

  // const { isLoading, error, data } = useQuery(`shoe ${id}`, () => getShoe(id));

  const isLoading = false;
  const error = undefined;
  const data = {} as ShoeProps;

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>error</p>;
  }

  if (!data) {
    return <p>Shoe Not Found</p>;
  }

  return <Shoe {...data} />;
}

export default ShoePage;

function Shoe({
  Name,
  Description,
  Price,
  releaseDate,
  ID,
  CoverImage,
  Style,
  Section,
  Collection,
  Stars: stars,
  Brand,
  BrandIcon,
  colours,
  stock,
}: ShoeProps) {
  const { customer } = useContext(StoreContext);

  return (
    <Page>
      <Header>
        <Horizontal>
          <IconImage src={`/image/${BrandIcon}/low`} />
          <Title>{Name}</Title>
        </Horizontal>

        <Stars n={stars} white />
        <StyledPriceText>${Price}</StyledPriceText>
      </Header>
      <Body>
        <Images colours={colours} CoverImage={CoverImage} />
        <BodyText>
          <Text>Brand: {Brand}</Text>
          <Text>Description: {Description}</Text>
          <Text>Style: {Style}</Text>
          <Text>Section: {Section}</Text>
          <Text>Collection: {Collection}</Text>
          <Horizontal style={{ width: "100%" }}>
            <WishlistButton ShoeID={ID} />
            <Button
              onClick={() => {
                if (customer) {
                  return addToCart(ID, { StockID: stock[0].ID, quantity: 1 });
                }
              }}
              style={{ width: "100%" }}
            >
              <h3>Add to Cart</h3>
            </Button>
          </Horizontal>
        </BodyText>
      </Body>
      <Reviews shoeID={ID} />
    </Page>
  );
}

interface WishlistButtonProps {
  ShoeID: number;
}

const WishlistButton = ({ ShoeID }: WishlistButtonProps) => {

  const [fav, setFav] = useState(false)

  useEffect(() => {
    const run = async () => {
      const isFav = await isInWishlist(ShoeID)
      setFav(isFav)
    }
    run()
  }, [ShoeID])

  return (
    <button style={{ minWidth: 75 }} onClick={() => {
      if (!fav) {
        addToWishlist(ShoeID)
        setFav(true)
      } else {
        removeFromWishlist(ShoeID)
        setFav(false)
      }
    }}>
      {fav ? (
        <AiFillStar color="white" size={32} />
      ) : (
        <AiOutlineStar color="white" size={32} />
      )}
    </button>
  );
};

interface ButtonProps {
  children: string | JSX.Element;
  onClick?: () => Promise<any> | any;
  Success?: JSX.Element;
  Fail?: JSX.Element;
  style?: React.CSSProperties;
}

const Button = ({ children, onClick, Success, Fail, style }: ButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [error, setError] = useState();

  const clickHandler = async () => {
    try {
      setSuccess(false);
      setFailed(false);
      setLoading(true);
      if (onClick) {
        await onClick();
      }
      setSuccess(true);
    } catch (error) {
      setError(error);
      setFailed(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={clickHandler} style={style}>
      {loading ? (
        <Loading />
      ) : success ? (
        Success || <TiTickOutline size={28} />
      ) : failed ? (
        Fail || <TiTimesOutline size={28} />
      ) : (
        children
      )}
    </button>
  );
};

const Page = styled.div`
  min-height: calc(101vh - 300px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Body = styled.div`
  display: inline-grid;
  grid-template-columns: auto auto;
`;

const Header = styled.div`
  display: inline-flex;
  justify-content: space-evenly;
  width: 100%;
  max-width: 900px;
`;

const Horizontal = styled.div`
  display: inline-flex;
`;

const IconImage = styled.img`
  height: 30px;
  width: 30px;
  object-fit: cover;
  margin: 10px;
  padding: 10px;
  filter: invert(1);
`;

export const Title = styled.h2`
  margin: 10px;
  padding: 10px;

  font-family: "Fugaz One", cursive;
`;

export const StyledPriceText = styled.h3`
  margin: 10px;
  padding: 10px;

  font-family: "Anton", sans-serif;

  align-items: center;
  display: inline-flex;
`;

const BodyText = styled.div`
  max-width: 400px;
  padding: 10px;
  margin: 10px;
`;

const Text = styled.p`
  margin: 10px;
  padding: 10px;
`;
