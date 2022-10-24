import {Controller, FieldValues, Path, useFormContext} from "react-hook-form";
import styled from "styled-components";
import {MouseEventHandler, useId} from "react";

import {Container, Label} from "./TextInput";

import {ImCheckboxChecked} from "@react-icons/all-files/im/ImCheckboxChecked";
import {ImCheckboxUnchecked} from "@react-icons/all-files/im/ImCheckboxUnchecked";
import { useMetaForm } from "./FormContext";

interface CheckboxProps<T> {
    name: Path<T>;
    label: string;
}

export const Checkbox = <T extends FieldValues>({name, label}: CheckboxProps<T>) => {
    const id = useId();
    const {control} = useFormContext()

    return (
        <Container>
            <Label htmlFor={id}>{label}</Label>
            <Controller control={control} name={name}
                render={({field: {ref, ...field}}) => <ClickableBox id={id} {...field} />}/>
        </Container>
    );
};

interface ClickableBoxProps {
    value: boolean;
    id: string;
    onChange: (value: boolean) => void;
}

const ClickableBox = ({value, id, onChange}: ClickableBoxProps) => {
    const [submitting] = useMetaForm(store => store.submitting);

    const handleClick: MouseEventHandler<HTMLButtonElement> = () => !submitting && onChange(!value)
    
    return (
        <ContainerButton id={id} type="button" onClick={handleClick}>
            <Box checked={value} />
        </ContainerButton>
    )
}

const Box = ({checked}: { checked: boolean }) => {
    if (checked) {
        return <CheckedBox size={24}/>
    }
    return <UnCheckedBox size={24}/>
}

const CheckedBox = styled(ImCheckboxChecked)`
  color: #f04141;
`;
const UnCheckedBox = styled(ImCheckboxUnchecked)`
  color: #f04141;
`;

const ContainerButton = styled.button`
  background-color: transparent;

  &:hover {
    background-color: transparent;
  }

  padding: 2px;
  cursor: pointer;
`;
