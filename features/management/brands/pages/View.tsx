import { Container } from "./Add";
import { Title } from "@/components/Title";
import { useQuery } from "@/lib/useQuery";
import type { Page } from "@/lib/Page";
import { trpc } from "../trpc";
import { Brand, BrandForm } from "../forms/Brand";
import { ImageUpload } from "@/components/ImageUpload";

export const ViewBrand: Page = () => {
  const { brandId } = useQuery("brandId")

  const { data: brand, refetch } = trpc.getBrand.useQuery({ brandId })
  const { mutateAsync: updateBrand } = trpc.updateBrand.useMutation()

  const handleSubmit = async (patch: Brand) => {
    
    await updateBrand({
      brandIds: [brandId],
      patch
    })

    refetch();

  }

  if (!brand) return null;

  return (
    <Container>
      <Title>Brand: {brand.name}</Title>
      <ImageUpload image={brand.icon} />
      <BrandForm initial={brand} handleSubmit={handleSubmit} action="update" />
    </Container>
  )
}

ViewBrand.smallNavBar = true;
ViewBrand.hideNavItems = true;