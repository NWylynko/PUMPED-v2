import { Title } from "@/components/Title";
import type { Page } from "@/lib/Page";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Brand, BrandForm } from "../forms/Brand";
import { trpc } from "../trpc";

export const AddBrand: Page = () => {

  const { mutateAsync: createBrand } = trpc.createBrand.useMutation()
  const router = useRouter()

  const handleSubmit = async (newBrand: Brand) => {

    // this has the support to create many brands at once
    // so we need to pass it an array of are single brand
    const response = await createBrand([newBrand])

    // additionally we must pull out the first item
    const { brandId } = response[0]

    router.push(`/admin/brand/${brandId}`)
  }

  return (
    <Container>
      <Title>Add a Brand</Title>
      <BrandForm handleSubmit={handleSubmit} action="add" />
    </Container>
  )
}

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

AddBrand.smallNavBar = true;
AddBrand.hideNavItems = true;