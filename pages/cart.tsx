import React, { useContext, useState, useEffect } from "react";
import StoreContext from "../lib/store";
import styled from "styled-components";
import {
  checkoutCart,
  clearCart,
  getCart,
  // getShoe,
  updateCart,
} from "../lib/api";
import type { OrderItem } from "../PUMPED-api/api/order/types";
import { Loading } from "../components/loading";
import Link from "next/link";
import { ShoeWithDetails } from "../PUMPED-api/api/shoe/types";


const CheckCustomerID = () => {
  const { customer } = useContext(StoreContext);

  if (!customer) {
    return (
      <Page>
        <h2>Cart</h2>
        <p>no customer id</p>
      </Page>
    );
  }

  return <Cart />;
};

export default CheckCustomerID;

interface Props { }

export const Cart = (props: Props): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(undefined);
  const [data, setData] = useState<OrderItem[]>();
  const [reFetch, setReFetch] = useState(false);

  useEffect(() => {
    const run = async () => {
      try {
        const cart = await getCart();
        setData(cart);
      } catch (error: any) {
        setError(error.message);
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
        <h2>Cart</h2>
        <p>The cart is empty</p>
      </Page>
    );
  }

  const total = data.reduce(
    (sum, { currentPrice, quantity }) => sum + currentPrice * quantity,
    0
  );

  return (
    <Page>
      <h2>Cart</h2>
      <Shoes data={data} />
      <TotalContainer>
        <Total>Total ${total}</Total>
      </TotalContainer>
      <ButtonContainer>
        <button
          onClick={async () => {
            await clearCart();
            setReFetch((state) => !state);
          }}
        >
          Clear the cart
        </button>
        <button
          onClick={async () => {
            await checkoutCart("the moon");
            setReFetch((state) => !state);
          }}
        >
          Checkout
        </button>
      </ButtonContainer>
    </Page>
  );
};

const Page = styled.div`
  min-height: calc(101vh - 300px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Total = styled.p`
  width: 700px;
  text-align: end;
  margin: 2px;
  padding: 10px;
  border-radius: 5px;

  background-color: #131212;
`;

const TotalContainer = styled.div`
  margin: 10px;
  background: linear-gradient(to right, #131212, #131212, #131212, white);
  border-radius: 5px;
`;

const ButtonContainer = styled.div`
  /* align-items: center; */
`;

const Shoes = ({ data }: { data: OrderItem[] }) => {
  return <>{data.map(Shoe)}</>;
};

const Shoe = ({ ShoeID, StockID, quantity }: OrderItem) => {
  // const { isLoading, error, data } = useQuery(`shoe ${ShoeID}`, () =>
  //   getShoe(ShoeID)
  // );

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
      <Horizontal>
        <p>Quantity</p>
        <QuantitySelector
          currentQuantity={quantity}
          onSelect={(n) => {
            updateCart(ShoeID, { quantity: n });
          }}
        />
      </Horizontal>
      <p>${data.Price}</p>
    </Container>
  );
};

const Horizontal = styled.div`

  display: inline-flex;
  width: 110px;
  justify-content: space-around;

`;

const QuantitySelector = ({
  currentQuantity,
  onSelect,
}: {
  currentQuantity: number;
  onSelect?: (n: number) => void;
}) => {
  const [value, setValue] = useState(currentQuantity);

  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = parseInt(event.target.value, 10);
    setValue(newValue);
    if (onSelect) {
      onSelect(newValue);
    }
  };

  return (
    <StyledSelect value={value} onChange={onChange}>
      {options.map((n) => (
        <option value={n} key={n}>{n}</option>
      ))}
    </StyledSelect>
  );
};

const StyledSelect = styled.select`

  background-color: #131212;
  border: none;
  font-size: 16px;

`;

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
