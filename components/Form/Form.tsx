import { useForm, FormProvider, useFormContext, FieldValues } from "react-hook-form";
import styled from "styled-components";

interface FormProps <T> {
  children: JSX.Element[]
  onSubmit: (formData: T) => Promise<void>;
}

export const Form = <T extends FieldValues, > ({ children, onSubmit }: FormProps<T>): JSX.Element => {

  const methods = useForm<T>();

  const handleSubmit = methods.handleSubmit(onSubmit)

  return (
    <>
      <FormProvider {...methods}>
        <StyledForm onSubmit={handleSubmit}>
          {children}
        </StyledForm>
      </FormProvider>
    </>
  )
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  min-width: 320px;
  max-width: 480px;
  width: 100%;
`;