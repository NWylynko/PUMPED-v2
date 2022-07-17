import styled from "styled-components"
import { useFirebase } from "@bluesky-digital-labs/next-firebase-auth";
import { useEffect } from "react";

export const Login = () => {
  const { user, jwt, loading, loggedIn, auth } = useFirebase();

  return (
    <Container>
      <Text>Please login</Text>
      <button onClick={auth.google}>Continue</button>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Text = styled.h2``;