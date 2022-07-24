import { useState } from "react";

import Link from "next/link";
import styled from "styled-components";
import { Loading } from "@/components/loading";
import { Stars } from "@/components/Stars";
import { StyledPriceText, Title } from "../../../../pages/shoe/[id]";
import type { ShoeColour } from "../../../../PUMPED-api/api/colour/types";
import { useShoes } from "../lib/useShoes";
import { useShoeDetails } from "../lib/useShoeDetails";

export const Shoes = () => {

  const { data } = useShoes();

  if (!data) {
    return <Loading />
  }

  return (
    <Page>
      <Grid>{data.map((item) => {
        if (!item) return null;

        const { shoeId } = item;

        return <Shoe key={shoeId} shoeId={shoeId} />
      })}</Grid>
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

interface ShoeProps {
  shoeId: string
}

const Shoe = ({ shoeId }: ShoeProps) => {

  const { data } = useShoeDetails({ shoeId });

  console.log('shoe', data)

  const [imageID, setImageID] = useState(data?.coverImage.imageId);

  if (!data) return null;

  return (
    <Link href={encodeURI(`/shoe/${shoeId}`)} passHref >
      <StyledA>
        <ShoeContainer>
          <CoverImg ImageID={imageID} />
          <ShoeText>
            <Horizontal>
              {/* <IconImg ImageID={data?.brand.brandId} /> */}
              <StyledPriceText style={{ color: "black" }}>{data.brand.name}</StyledPriceText>
              <Stars n={data?.stars ?? 0} />
              <StyledPriceText style={{ color: "black" }}>${data?.price}</StyledPriceText>
            </Horizontal>
            <div>
              <Title
                style={{
                  color: "black",
                  textAlign: "center",
                  marginTop: 20,
                  fontSize: 16,
                  paddingBottom: 0,
                }}
              >
                {data.name}
              </Title>
              {/* <Colours colours={colours} setImageID={setImageID} /> */}
            </div>
          </ShoeText>
        </ShoeContainer>
      </StyledA>
    </Link>
  );
};

const StyledA = styled.a`
  text-decoration: none;
`;

const ShoeContainer = styled.div`
  margin: 10px;
  padding: 10px;
  max-width: 300px;
  position: relative;
`;

const Horizontal = styled.div`
  width: 300px;
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;

  margin-top: 4px;
  margin-bottom: 4px;
  padding-top: 4px;
  padding-bottom: 4px;
`;

const ShoeText = styled.div`
  position: absolute;
  inset: 10px;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 300px;
`;

const Colours = ({
  colours,
  setImageID,
}: {
  colours: ShoeColour[];
  setImageID: (n: number) => void;
}) => {
  return (
    <ColoursContainer>
      {colours.map((props, index) => (
        <HoverColourCircle colour={props} key={index} setImageID={setImageID} />
      ))}
    </ColoursContainer>
  );
};

const ColoursContainer = styled.div`
  display: inline-flex;
  width: 280px;
  justify-content: space-evenly;
  margin: 10px;
`;

const HoverColourCircle = ({
  colour,
  setImageID,
}: {
  colour: ShoeColour;
  setImageID: (n: number) => void;
}) => {
  return (
    <ColourCircle {...colour} onMouseEnter={() => setImageID(colour.ImageID)} />
  );
};

const ColourCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid white;
  background-color: ${({ hex }: ShoeColour) => hex};

  &:hover {
    border-color: ${({ hex }: ShoeColour) => hex};
  }
`;

const IconImg = ({ ImageID }: { ImageID: string }) => {
  const url = `/api/image/${ImageID}/low`;

  return <IconImage src={url} />;
};

const IconImage = styled.img`
  height: 30px;
  width: 30px;
  object-fit: cover;
  padding: 10px;
  margin: 10px;
`;

const CoverImg = ({ ImageID }: { ImageID?: string }) => {

  if (!ImageID) return null;

  const url = `/api/image/${ImageID}/medium`;

  // const { isLoading, error, data } = useQuery("shoes", () => getImage(url));

  // if (isLoading) {
  //   return null;
  // }

  // if (error) {
  //   return null;
  // }

  // const { name, src } = data

  return <Image src={url} alt={""} />;

  // return null
};

const Image = styled.img`
  width: 300px;
  height: 300px;

  object-fit: cover;
`;
