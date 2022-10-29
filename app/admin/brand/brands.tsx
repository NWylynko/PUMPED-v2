export const brands = [
  {
    brandId: "1",
    name: "Nike",
    website: "nike.com.au"
  },
  {
    brandId: "2",
    name: "Adidas",
    website: "adidas.com.au"
  },
  {
    brandId: "3",
    name: "Converse",
    website: "converse.com.au"
  },
  {
    brandId: "4",
    name: "Reebok",
    website: "reebok.com.au"
  },
  {
    brandId: "5",
    name: "Vans",
    website: "vans.com.au"
  },
];

export const getBrands = () => {
  return brands;
}

export const getBrand = (brandId: string) => {
  return brands.find(brand => brand.brandId === brandId)
}