import {useId} from "react";
import {FieldValues, Path, useFormContext} from "react-hook-form";
import styled from "styled-components";
import {useMetaForm} from "./FormContext";
import {Container, Label, Input} from "./TextInput";

interface DateInputProps<T> {
    name: Path<T>;
    label: string;
}

export const DateInput = <T extends FieldValues, >({name, label}: DateInputProps<T>) => {
    const [submitting] = useMetaForm(store => store.submitting);

    const id = useId();

    const methods = useFormContext<T>()

    return (
        <Container>
            <Label htmlFor={id}>{label}</Label>
            <Input id={id} {...methods.register(name)} disabled={submitting} type="datetime-local"/>
        </Container>
    )
}