import { useId } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import styled from "styled-components";
import { useMetaForm } from "./FormContext";
import { Container, Label } from "./TextInput";


interface TextAreaProps <T> {
  name: Path<T>;
  label: string;
}

export const TextArea = <T extends FieldValues,> ({ name, label }: TextAreaProps<T>) => {
  const [submitting] = useMetaForm(store => store.submitting);
  const id = useId();
  const methods = useFormContext<T>()

  return (
    <Container>
      <Label htmlFor={id}>{label}</Label>
      <StyledTextArea id={id} {...methods.register(name)} disabled={submitting} />
    </Container>
  )
  
}

const StyledTextArea = styled.textarea``;