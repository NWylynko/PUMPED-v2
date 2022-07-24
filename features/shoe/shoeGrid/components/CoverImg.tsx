import styled from "styled-components";

export const CoverImg = ({ ImageID }: { ImageID?: string; }) => {

  if (!ImageID)
    return null;

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
