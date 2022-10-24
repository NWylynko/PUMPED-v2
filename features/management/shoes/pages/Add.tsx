import {Checkbox} from "@/components/Form/Checkbox";
import {DateInput} from "@/components/Form/DateInput";
import {Form} from "@/components/Form/Form";
import {MultiSelect} from "@/components/Form/MultiSelect";
import {SubmitButton} from "@/components/Form/SubmitButton";
import {TextArea} from "@/components/Form/TextArea";
import {TextInput} from "@/components/Form/TextInput";
import {Title} from "@/components/Title";
import type {inferProcedureInput} from "@trpc/server";
import {NextSeo} from "next-seo";
import {DeepPartial} from "react-hook-form";
import styled from "styled-components";
import {Router, trpc} from "../trpc";

type NewShoe = inferProcedureInput<Router["addNewShoe"]>;

const initialValues: DeepPartial<NewShoe> = {
    public: false,
}

export function AddShoePage() {
    const {mutateAsync: addNewShoe} = trpc.addNewShoe.useMutation();

    const onSubmit = async (shoe: NewShoe) => {

        console.log({shoe})

        // const response = await addNewShoe(shoe);

        // console.log(response);
    };

    const {data: brands} = trpc.getBrands.useQuery();
    const brandOptions = brands?.map((brand) => ({
        value: brand?.brandId,
        label: brand?.name,
    })) ?? []

    return (
        <>
            <NextSeo title="Add Shoe"/>
            <Container>
                <Title>Add a New Shoe</Title>
                <Form<NewShoe> onSubmit={onSubmit} defaultValues={initialValues}>
                    <TextInput<NewShoe> name="name" label="Name"/>
                    <TextArea<NewShoe> name="description" label="Description"/>
                    <TextInput<NewShoe> name="price" label="Price"/>
                    <DateInput<NewShoe> name="releaseDate" label="Release Date"/>
                    <Checkbox<NewShoe> name="public" label="Public"/>
                    <MultiSelect<NewShoe> name="brand" options={brandOptions} label="Brand"/>
                    <MultiSelect<NewShoe> name="style" options={[]} label="Style"/>
                    <MultiSelect<NewShoe> name="section" options={[]} label="Section"/>
                    <MultiSelect<NewShoe> name="collection" options={[]} label="Collection"/>
                    <SubmitButton text="Continue"/>
                </Form>
            </Container>
        </>
    );
}

AddShoePage.smallNavBar = true;
AddShoePage.hideNavItems = true;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;