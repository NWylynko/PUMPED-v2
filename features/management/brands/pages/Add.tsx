import { Form } from "@/components/Form/Form";
import { SubmitButton } from "@/components/Form/SubmitButton";
import { TextInput } from "@/components/Form/TextInput";
import { Router, trpc } from "../trpc";
import { inferProcedureInput } from "@trpc/server";
import styled from "styled-components";
import type { Page } from "@/lib/Page";
import { Title } from "@/components/Title";
import { useRouter } from "next/router";

type NewBrand = inferProcedureInput<Router["createBrand"]>[number]

export const AddBrand: Page = () => {

  const { mutateAsync: createBrand } = trpc.createBrand.useMutation()
  const router = useRouter()

  const handleSubmit = async (newBrand: NewBrand) => {

    // this has the support to create many brands at once
    // so we need to pass it an array of are single brand
    const response = await createBrand([newBrand])

    // additionally we must pull out the first item
    const { brandId } = response[0]

    router.push(`/admin/brand/${brandId}`)
  }

  return (
    <>
      <Container>
        <Title>Add a Brand</Title>
        <Form<NewBrand> onSubmit={handleSubmit}>
          <TextInput<NewBrand> name="name" label="Brand Name" example="Nike" />
          <TextInput<NewBrand> name="website" label="Brand Website" example="https://nike.com" />
          <SubmitButton text="Continue" />
        </Form>
      </Container>
    </>
  )
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

AddBrand.smallNavBar = true;
AddBrand.hideNavItems = true;