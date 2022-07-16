import HowLongAgo from "@nwylynko/how-long-ago";
import { ReactElement } from "react";
import styled from "styled-components";
import { Loading } from "@/components/loading";
import { Stars } from "@/components/Stars";

interface Props {
  shoeID: number;
}

function Reviews({ shoeID }: Props): ReactElement {
  // const { isLoading, error, data } = useQuery(`review ${shoeID}`, () =>
  //   getReviews(shoeID)
  // );

  const isLoading = false;
  const error = undefined;
  const data = []

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>error</p>;
  }

  if (data?.length === 0 || !data) {
    return (
      <Container>
        <h2>Reviews</h2>
        <p>No reviews</p>
      </Container>
    );
  }

  return (
    <Container>
      <h2>Reviews</h2>
      {data.map(({ firstName, lastName, stars, message, timestamp }, index) => (
        <Review key={index}>
          <Horizontal>
            <Text>{firstName}</Text>
            <Text>{lastName}</Text>
            <Stars n={stars} white style={{ margin: 2, padding: 2 }} />
            <Text>{HowLongAgo(timestamp)}</Text>
          </Horizontal>
          <Message>{message}</Message>
        </Review>
      ))}
    </Container>
  );
}

const Container = styled.div`
  margin: 10px;
  padding: 10px;
  min-width: 500px;
  text-align: center;
`;

const Review = styled.div`
  margin: 10px;
  padding: 10px;
  min-width: 500px;

  border: 2px solid white;

  border-radius: 5px;
`;

const Horizontal = styled.div`
  display: flex;
  margin: 5px;
  padding: 5px;
  justify-content: space-evenly;
`;

const Text = styled.p`
  margin: 2px;
  padding: 2px;
`;

const Message = styled.p`
  margin: 10px;
  padding: 10px;
  text-align: center;
`;

export default Reviews;
