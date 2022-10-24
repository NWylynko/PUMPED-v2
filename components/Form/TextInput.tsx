import { useId } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import styled from "styled-components";
import { useMetaForm } from "./FormContext";

interface TextInputProps <T> {
  name: Path<T>;
  label: string;
  example?: string;
}

export const TextInput = <T extends FieldValues,> ({ name, label, example }: TextInputProps<T>): JSX.Element => {

  const [submitting] = useMetaForm(store => store.submitting);

  const id = useId();

  const methods = useFormContext<T>()

  return (
    <Container>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...methods.register(name)} placeholder={example} disabled={submitting} />
    </Container>
  )
}

export const Container = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  align-items: center;
  align-content: center;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    grid-template-rows: 0.5fr 1fr;
  }

  margin: 8px;
  padding: 8px;
`;

export const Label = styled.label`
`;

export const Input = styled.input`
`;