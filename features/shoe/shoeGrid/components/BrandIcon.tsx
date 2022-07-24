import styled from "styled-components";

interface BrandIconProps { imageID?: string; }

export const BrandIcon = ({ imageID }: BrandIconProps) => {

  if (!imageID)
    return <></>;

  const url = `/api/image/${imageID}/low`;

  return <IconImage src={url} />;
};

const IconImage = styled.img`
  height: 30px;
  width: 30px;
  object-fit: cover;
  padding: 10px;
  margin: 10px;
`;
