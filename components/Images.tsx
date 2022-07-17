import React, { useState } from "react";
import styled from "styled-components";
import type { ShoeColour } from "../PUMPED-api/api/colour/types";

export function Images({ colours = [], CoverImage }: ImageProps) {
  const [selectedImage, setSelectedImage] = useState(CoverImage);

  return (
    <Container>
      <Image src={`/api/image/${selectedImage}/high`} alt="image" />
      <div>
        {colours.map(({ ImageID }) => (
          <SmallImage
            key={ImageID}
            onClick={() => { setSelectedImage(ImageID) }}
            src={`/api/image/${ImageID}/low`}
            selected={ImageID === selectedImage}
            alt="image"
          />
        ))}
      </div>
    </Container>
  );
}

interface ImageProps {
  colours: ShoeColour[];
  CoverImage: number;
}

const Container = styled.div``;

const Image = styled.img`
  height: 375px;
  width: 300px;

  object-fit: cover;

  padding: 2px;
  margin: 2px;
`;

const SmallImage = styled.img`
  height: 60px;
  width: 60px;

  object-fit: cover;

  padding: 2px;
  margin: 2px;

  border-width: 2px;
  border-color: ${({ selected }: { selected: boolean }) =>
    selected ? "white" : "transparent"};
  border-style: solid;
`;
