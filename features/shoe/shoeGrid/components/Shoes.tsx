
import { Loading } from "@/components/loading";
import styled from "styled-components";
import { useShoeIds } from "../lib/hooks";
import { Shoe } from "./Shoe";

export const Shoes = () => {

  const { data } = useShoeIds();

  if (!data) {
    return <Loading />
  }

  return (
    <Page>
      <Grid>
        {data.map((item) => {
          if (!item) return null;

          const { shoeId } = item;

          return <Shoe key={shoeId} shoeId={shoeId} />
        })}
      </Grid>
    </Page>
  );
};

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 20px;
  min-height: calc(101vh - 300px);
`;

const Grid = styled.main`
  display: grid;
  grid-template-columns: auto auto auto;

  @media (max-width: 960px) {
    grid-template-columns: 50% 50%;
  }

  @media (max-width: 650px) {
    grid-template-columns: auto;
  }
`;
