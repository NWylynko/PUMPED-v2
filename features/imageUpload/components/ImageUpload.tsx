import { useModals } from "@/lib/modals";
import styled from "styled-components";

interface ImageUploadProps {
  image: {
    imageId: string;
    name: string;
  };
}

export const ImageUpload = ({ image }: ImageUploadProps): JSX.Element => {

  const { open } = useModals()

  return (
    <Container>
      <Image src={`/api/image/${image.imageId}/medium`} alt={image.name} />
      <Name>{image.name}</Name>
      <Button onClick={() => open("ImageSelector")}>Select image</Button>
    </Container>
  );
};

const Container = styled.div`
  max-width: 400px;
  width: 100%;
  height: 150px;
  margin: 16px;

  background-color: #f04141;

  display: grid;
  grid-template-areas:
    "image name"
    "image button";
  justify-items: center;
  justify-content: space-around;
  align-content: center;
  align-items: center;
`;

const Image = styled.img`
  grid-area: image;

  background-color: #141111;

  height: 125px;
  width: 125px;
`;

const Name = styled.h3`
  grid-area: name;
`;

const Button = styled.button`
  grid-area: button;
  border: 4px solid #141111;
`;
