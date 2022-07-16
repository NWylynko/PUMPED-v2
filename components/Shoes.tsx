import React, { useState, useEffect } from "react";

import { ShoeWithColours } from "@/PUMPED-api/api/shoe/types";
import { ShoeColour } from "@/PUMPED-api/api/colour/types";
import styled from "styled-components";
import Link from "next/link";
import { Stars } from "@/components/Stars";
import { StyledPriceText, Title } from "@/pages/shoe/[id]";

export const Shoes = ({ data }: { data: ShoeWithColours[] }) => {
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Page>
      <Grid>{data.map(Shoe)}</Grid>
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

const Shoe = ({
  Name,
  Price,
  ID,
  CoverImage,
  Brand,
  colours,
  BrandIcon,
  Stars: stars,
}: ShoeWithColours) => {
  const [imageID, setImageID] = useState(CoverImage);

  return (
    <ShoeContainer key={ID} href={encodeURI(`/shoe/${ID}`)}>
      <ShoeText>
        <Horizontal>
          <IconImg ImageID={BrandIcon} />
          <Stars n={stars} />
          <StyledPriceText style={{ color: "black" }}>${Price}</StyledPriceText>
        </Horizontal>
        <div>
          <Title
            style={{
              color: "black",
              textAlign: "center",
              marginTop: 20,
              fontSize: 16,
              marginBottom: 0,
              paddingBottom: 0,
            }}
          >
            {Name}
          </Title>
          <Colours colours={colours} setImageID={setImageID} />
        </div>
      </ShoeText>
      <CoverImg ImageID={imageID} />
    </ShoeContainer>
  );
};

const ShoeContainer = styled(Link)`
  margin: 10px;
  padding: 10px;
  max-width: 300px;
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

const IconImg = ({ ImageID }: { ImageID: string | number }) => {
  const url = `/image/${ImageID}/low`;

  return <IconImage src={url} />;
};

const IconImage = styled.img`
  height: 30px;
  width: 30px;
  object-fit: cover;
  padding: 10px;
  margin: 10px;
`;

const CoverImg = ({ ImageID }: { ImageID: number }) => {
  const url = `/image/${ImageID}/medium`;

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
