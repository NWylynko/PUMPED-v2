import {FieldValues, Path, useFormContext, Controller} from "react-hook-form";
import {useId} from "react";
import styled from "styled-components";
import {useMetaForm} from "./FormContext";
import {Container, Label} from "./TextInput";
import Select from "react-select"

interface MultiSelectProps<T> {
    name: Path<T>;
    options: Array<any>
    label: string;
}

export const MultiSelect = <T extends FieldValues, >({ name, options, label }: MultiSelectProps<T>) => {
    const id = useId()
    const { control } = useFormContext()
    const [submitting] = useMetaForm(store => store.submitting);

    return (
        <Container>
            <Label htmlFor={id}>{label}</Label>
            <Controller control={control} name={name}
                render={({field: {ref, ...field}}) => <StyledSelect id={id} {...field} options={options} isDisabled={submitting} />}/>
        </Container>
    )
}

const StyledSelect = styled(Select)`
    font-family: "allumi-std",sans-serif;
`;