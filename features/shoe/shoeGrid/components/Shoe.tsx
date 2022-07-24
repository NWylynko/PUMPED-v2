import { useState } from "react";
import { Stars } from "@/components/Stars";
import Link from "next/link";
import styled from "styled-components";
import { StyledPriceText, Title } from "../../../../pages/shoe/[id]";
import { useShoeDetails } from "../lib/hooks";
import { CoverImg } from "./CoverImg";
import { BrandIcon as BrandIcon } from "./BrandIcon";
import { Colours } from "./Colours";

interface ShoeProps {
  shoeId: string;
}

export const Shoe = ({ shoeId }: ShoeProps) => {

  const { data } = useShoeDetails({ shoeId });

  console.log('shoe', data);

  const [imageID, setImageID] = useState<string | undefined>(data?.coverImage.imageId);

  if (!data)
    return null;

  return (
    <Link href={encodeURI(`/shoe/${shoeId}`)} passHref>
      <StyledA>
        <ShoeContainer>
          <CoverImg ImageID={imageID} />
          <ShoeText>
            <Horizontal>
              <BrandIcon imageID={data.brand.icon?.imageId} />
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
              <Colours shoeId={data.shoeId} setImageID={setImageID} />
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
