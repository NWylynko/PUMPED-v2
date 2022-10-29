import { getBrand } from "../brands"

export default function BrandPage() {

  const brand = getBrand("1")

  return (
    <main>
      <span>{JSON.stringify(brand, null, 2)}</span>
    </main>
  )
}

