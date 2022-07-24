import { Loading } from "@/components/loading";
import styled from "styled-components";
import { useShoeColourIds } from "../lib/hooks";
import { HoverColourCircle } from "./HoverColourCircle";

interface ColoursProps {
  shoeId: string;
  setImageID: (imageId: string) => void;
}

export const Colours = ({
  shoeId, setImageID,
}: ColoursProps) => {

  const { data: colours } = useShoeColourIds({ shoeId });

  if (!colours)
    return <Loading />;

  return (
    <ColoursContainer>
      {colours.map((props) => {
        if (!props) {
          return <></>;
        }

        const { colourId } = props;

        return (
          <HoverColourCircle colourId={colourId} key={colourId} setImageID={setImageID} />
        );
      })}
    </ColoursContainer>
  );
};

const ColoursContainer = styled.div`
  display: inline-flex;
  width: 280px;
  justify-content: space-evenly;
  margin: 10px;
`;
