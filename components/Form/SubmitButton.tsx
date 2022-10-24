import styled from "styled-components";
import { useMetaForm } from "./FormContext";

interface SubmitButtonProps {
  text: string;
}

export const SubmitButton = ({ text }: SubmitButtonProps) => {

  const [submitting] = useMetaForm(store => store.submitting);

  return (
    <Container>
      <Button type="submit" disabled={submitting}>{text}</Button>
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