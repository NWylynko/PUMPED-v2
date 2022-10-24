import { DeepPartial, FieldValues, FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import { MetaFormProvider, useMetaForm } from "./FormContext";

interface FormProps <T> {
  children: JSX.Element[]
  onSubmit: (formData: T) => Promise<void>;
  defaultValues?: DeepPartial<T>
}

const FormComponent = <T extends FieldValues, > ({ children, onSubmit, defaultValues }: FormProps<T>): JSX.Element => {

  const [, setSubmitting] = useMetaForm(store => store.submitting);

  const methods = useForm<T>({ defaultValues });

  const handleSubmit = methods.handleSubmit(async (form) => {
    setSubmitting({ submitting: true });
    await onSubmit(form);
    // setSubmitting({ submitting: false });
  })

  return (
    <MetaFormProvider>
      <FormProvider {...methods}>
        <StyledForm onSubmit={handleSubmit}>
          {children}
        </StyledForm>
      </FormProvider>
    </MetaFormProvider>
  )
}

// wrapper to add in our provider
export const Form = <T extends FieldValues, > (props: FormProps<T>): JSX.Element => {
  return (
    <MetaFormProvider>
      <FormComponent {...props} />
    </MetaFormProvider>
  )
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  min-width: 320px;
  max-width: 480px;
  width: 100%;
`;