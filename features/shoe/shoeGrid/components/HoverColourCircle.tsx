import styled from "styled-components";
import { useShoeColour } from "../lib/hooks";

interface HoverColourCircleProps {
  colourId: string;
  setImageID: (colourId: string) => void;
}

export const HoverColourCircle = ({
  colourId, setImageID,
}: HoverColourCircleProps) => {

  const { data: colour } = useShoeColour({ colourId });

  if (!colour)
    return null;

  return (
    <ColourCircle hex={colour.hex} onMouseEnter={() => setImageID(colour.image.imageId)} />
  );
};

const ColourCircle = styled.div<{ hex: string; }> `
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid white;
  background-color: ${({ hex }) => hex};

  &:hover {
    border-color: ${({ hex }) => hex};
  }
`;
