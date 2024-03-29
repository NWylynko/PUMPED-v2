import type { Page } from "@/lib/Page";
import { trpc } from "../trpc";
import Link from "next/link";
import { Fragment } from "react";
import styled from "styled-components";

export const BrandsList: Page = () => {
  const { data: brands } = trpc.getBrands.useQuery();

  return (
    <Main>
      <List>
        <Link href={`/admin/brand/add`}>
          <Item>
            <Title>Add Brand</Title>
          </Item>
        </Link>
        {brands?.map((brand) => (
          <Fragment key={brand.brandId}>
            <Link href={`/admin/brand/${brand.brandId}`}>
              <Item>
                <Title>{brand.name}</Title>
                <Website>{brand.website}</Website>
              </Item>
            </Link>
          </Fragment>
        ))}
      </List>
    </Main>
  );
};

BrandsList.smallNavBar = true;
BrandsList.hideNavItems = true;

const Main = styled.main`
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
`;

const List = styled.div`
  margin: 32px;
  padding: 32px;
  gap: 32px;

  display: flex;
  flex-direction: column;

  max-width: 400px;
`;

const Item = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;

  border: 2px dotted #f04141;
  border-radius: 8px;

  padding: 12px;
  min-width: 300px;

  &:hover {
    border-style: solid;
    cursor: pointer;
  }
`;

const Title = styled.h2``;

const Website = styled.span`
  color: #7c7c7c;
`;