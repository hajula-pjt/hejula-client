import React, { useState, useEffect, FC } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

import { css } from "@emotion/react";
import styled from "@emotion/styled";

import Modal from "./Modal";
import RoomSearchForm from "../domain/RoomSearch/SearchForm/RoomSearchForm";
import LoginForm from "../domain/Login/LoginForm";

import {
  getLocalStorageItem,
  removeLocalStorageItem,
} from "../utils/localStorage";
import HamburgerMenu from "./HamburgerMenu";

export type AppLayoutProps = {
  children: React.ReactNode;
  isMainPage: boolean;
  isUnVisibleSearchForm: boolean;
};

const AppLayout: FC<AppLayoutProps> = ({
  children,
  isMainPage,
  isUnVisibleSearchForm,
}) => {
  const [cookies, setCookie, removeCookie] = useCookies(["Authorization"]);

  const [user, setUser] = useState(null);

  const [toggleMenuOpen, setToggleMenuOpen] = useState(false);
  const [loginFormOpen, setLoginFormOepn] = useState(false);

  const handleSetUser = (userInfo) => {
    setUser(userInfo);
  };

  const handleSetCookie = ({ key, value }) => {
    setCookie(key, value);
  };

  const handleLogoutClick = () => {
    removeCookie("Authorization");
    removeLocalStorageItem({ key: "userInfo" });
    handleSetUser(null);
  };

  const handleLoginModalToggle = () => {
    setLoginFormOepn((prev) => !prev);
  };

  const handleMenuButtonClickToggle = () => {
    setToggleMenuOpen((prev) => !prev);
  };

  const handleToggleMenuClose = () => {
    setToggleMenuOpen(false);
  };

  const handleLoginFormClose = () => {
    setLoginFormOepn(false);
  };

  useEffect(() => {
    handleSetUser(getLocalStorageItem({ key: "userInfo" }));
  }, []);

  useEffect(() => {
    if (cookies) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${cookies.Authorization}`;
    }
  }, [cookies]);

  return (
    <>
      <Header shadow={!isMainPage}>
        <Logo>
          <button type="button">HAJULA</button>
        </Logo>
        {!isUnVisibleSearchForm && <RoomSearchForm shadow={!isMainPage} />}
        <HamburgerMenu
          toggleMenuOpen={toggleMenuOpen}
          user={user}
          onMenuButtonClickToggle={handleMenuButtonClickToggle}
          onLoginModalToggle={handleLoginModalToggle}
          onLogoutClick={handleLogoutClick}
        />
      </Header>
      {loginFormOpen && (
        <Modal title="로그인" onOutsideClick={handleLoginModalToggle}>
          <LoginForm
            setCookie={handleSetCookie}
            setUser={handleSetUser}
            onLoginFormClose={handleLoginFormClose}
            onToggleMenuClose={handleToggleMenuClose}
          />
        </Modal>
      )}
      {children}
    </>
  );
};

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 40px;
  width: 100%;
  z-index: 1;
  ${({ shadow }) =>
    shadow &&
    css`
      background: #fff;
      box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
      h1 *,
      nav * {
        color: #333 !important;
      }
    `}
`;

const Logo = styled.h1`
  button {
    color: #fff;
    font-size: 2rem;
    letter-spacing: 0.2em;
  }
`;

export default AppLayout;
