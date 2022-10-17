import { Loading } from "@/components/loading";
import { Title } from "@/components/Title";
import { AppRouter, trpc } from "@/lib/trpc";
import type { inferProcedureInput } from "@trpc/server";
import { NextSeo } from "next-seo";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Select from "react-select";

type NewShoe = inferProcedureInput<AppRouter["addShoe"]["addNewShoe"]>;

export function AddShoePage() {
  const { register, handleSubmit } = useForm<NewShoe>();
  const { mutate: addNewShoe, isLoading } = trpc.addShoe.addNewShoe.useMutation();

  const onSubmit = handleSubmit(async (shoe) => {
    const response = addNewShoe(shoe);

    console.log(response);
  });

  const { data: brands } = trpc.addShoe.getBrands.useQuery();
  const brandOptions = brands?.map((brand) => ({
    value: brand?.brandId,
    label: brand?.name,
  }))

  return (
    <>
      <NextSeo title="Add Shoe" />
      <Main>
        <Title>Add a New Shoe</Title>
        {isLoading ? (
          <Loading />
        ) : (
          <Form onSubmit={onSubmit}>
            <Label>Name:</Label>
            <Input {...register("name")} />

            <Label>Description:</Label>
            <Input {...register("description")} />

            <Label>Price:</Label>
            <Input {...register("price")} />

            <Label>Release Date:</Label>
            <Input {...register("releaseDate")} />

            <Label>Public:</Label>
            <Input {...register("public")} type="checkbox" />

            <Label>Brand:</Label>
            <Select options={brandOptions} isSearchable />

            <div />
            <Button>Submit</Button>
          </Form>
        )}
      </Main>
    </>
  );
}

AddShoePage.smallNavBar = true;
AddShoePage.hideNavItems = true;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
`;

const Label = styled.label``;

const Input = styled.input`
  min-width: 200px;
`;

const Button = styled.button``;
