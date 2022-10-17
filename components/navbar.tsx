import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import bannerImg from "../public/banner.png";

interface NavBarProps {
  large?: boolean;
  hideNavItems?: boolean;
}

export default function Navbar({ large = true, hideNavItems = false }: NavBarProps) {
  return (
    <Container>
      <StyledHeader>
        <div></div>
        <StyledLink href="/" passHref>
          <A>
            <PUMPEDContainer>
              <PUMPED src={bannerImg} height={large ? "300" : "100"} width={large ? "600" : "200"} />
            </PUMPEDContainer>
          </A>
        </StyledLink>
        {hideNavItems ? null : (
          <List>
            <Item>
              <Link href={"/"} passHref>
                <A>
                  <h3>Home</h3>
                </A>
              </Link>
            </Item>
            <Item>
              <Link href={"/cart"} passHref>
                <A>
                  <h3>Cart</h3>
                </A>
              </Link>
            </Item>
            <Item>
              <Link href={"/wishlist"} passHref>
                <A>
                  <h3>Wishlist</h3>
                </A>
              </Link>
            </Item>
          </List>
        )}
      </StyledHeader>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledHeader = styled.header`
  display: inline-grid;
  grid-template-columns: 200px auto 200px;

  @media (max-width: 1040px) {
    grid-template-columns: auto;
    grid-template-rows: 0 auto auto;
  }
`;

const List = styled.ul`
  display: inline-flex;
  list-style-type: none;
  align-items: center;

  padding: 0;

  @media (max-width: 1040px) {
    justify-content: center;
    padding: 0;
    margin-top: 0;
  }
`;

const Item = styled.li`
  margin: 3px;
  padding: 3px;
`;

const A = styled.a`
  text-decoration: none;

  margin: 0;
  padding: 0;
`;

const PUMPED = styled(Image)`
  max-height: 300px;
`;

const PUMPEDContainer = styled.div`
  justify-content: center;
  align-items: center;
  display: inline-flex;

  /* animation: slideup 2s ease-in-out;

  @keyframes slideup {
    from {
      height: 100vh;
    }

    to {
      height: 300px;
    }
  } */
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
