import { Form } from "@/components/Form/Form"
import { SubmitButton } from "@/components/Form/SubmitButton"
import { TextInput } from "@/components/Form/TextInput"
import type { inferProcedureInput } from "@trpc/server"
import type { Router } from "../trpc"

type NewBrand = inferProcedureInput<Router["createBrand"]>[number]
type UpdateBrand = inferProcedureInput<Router["updateBrand"]>["patch"]
export type Brand = NewBrand | UpdateBrand

interface BrandFormProps {
  initial?: Brand;
  handleSubmit: (brand: Brand) => Promise<void>;
  action: "add" | "update"
}

export const BrandForm = ({ initial, handleSubmit, action }: BrandFormProps) => {
  return (
    <Form<Brand> defaultValues={initial} onSubmit={handleSubmit}>
      <TextInput<Brand> name="name" label="Brand Name" example="Nike" />
      <TextInput<Brand> name="website" label="Brand Website" example="https://nike.com" />
      <SubmitButton text={action === "add" ? "Continue" : "Update"} />
    </Form>
  )
}