import styled from "styled-components"

interface SubmitButtonProps {
  text: string;
}

export const SubmitButton = ({ text }: SubmitButtonProps) => {

  return (
    <Container>
      <Button type="submit">{text}</Button>
    </Container>
  )

}

const Container = styled.div`
  margin: 8px;
  padding: 8px;
`;

const Button = styled.button`
  width: calc(100% - 16px);
`;