import React from "react";

import styled from "@emotion/styled";

import { IoMdMenu } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";

import RoomSearchForm from "../domain/RoomSearch/SearchForm/RoomSearchForm";

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 40px;
  width: 100%;
`;

const Logo = styled.h1`
  button {
    color: #fff;
    font-size: 2rem;
    letter-spacing: 0.2em;
  }
`;

const Nav = styled.nav`
  button {
    color: #fff;
    font-size: 1.5rem;
  }
`;

const ToggleMenu = styled.nav`
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 2em;
  button {
    display: flex;
    align-items: center;
    margin: auto 0;
    padding: 0.4em 0.5em 0.4em 1em;
    cursor: pointer;
    .menu svg {
      font-size: 1.6rem;
    }
    .profile svg {
      font-size: 2.3rem;
      color: #717171;
    }
    span + span {
      margin-left: 1rem;
    }
  }
`;

export type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <Header>
        <Logo>
          <button type="button">HAJULA</button>
        </Logo>
        <Nav>
          <p>
            <button type="button">숙소</button>
          </p>
        </Nav>
        <RoomSearchForm />
        <ToggleMenu>
          <button type="button">
            <span className="menu">
              <IoMdMenu />
            </span>
            <span className="profile">
              <FaUserCircle />
            </span>
          </button>
        </ToggleMenu>
      </Header>
      {children}
    </>
  );
};

export default AppLayout;
